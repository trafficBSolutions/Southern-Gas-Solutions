import { useState } from 'react';
import Header from '../components/headerHome';
import Footer from '../components/Footer';
import api from '../utils/api';
import '../css/careers.css';

const divisions = [
  {
    title: 'Above Ground — Interior / Service / Appliance',
    subtitle: 'Repairs, installs, emergency work — our high-impact service side.',
    icon: '🏠',
    positions: [
      { role: 'Lead Gas Technician (Service Tech)', duties: 'Diagnosing leaks & pressure issues, installing gas logs, tankless heaters & appliances, running attic lines, wall drops & regulator setups.' },
      { role: 'Gas Installer (Above Ground)', duties: 'Hard pipe installs (CSST / black iron), appliance hookups, venting & code compliance.' },
      { role: 'Apprentice / Helper', duties: 'Assists installs, learns code & layout, material handling.' },
      { role: 'Emergency Response Technician (24/7)', duties: 'Leak calls, shutoffs, safety response — a high-value frontline role.' },
    ],
  },
  {
    title: 'Below Ground — Underground / Site Work',
    subtitle: 'Bigger contracts, builder & commercial projects — our production side.',
    icon: '⛏️',
    positions: [
      { role: 'Underground Gas Crew Lead', duties: 'Layout of trenching paths, oversees pipe install (poly/gas main lines), pressure testing & inspections.' },
      { role: 'Equipment Operator', duties: 'Runs mini-ex, trencher, skid steer — critical for production speed.' },
      { role: 'Underground Installer', duties: 'Lays poly pipe, fusion connections, burial depth compliance.' },
      { role: 'Locator / Utility Tech', duties: 'Calls in locates (811), marks utilities before digging.' },
    ],
  },
];

const Careers = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', experience: '', message: '' });
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (resume) data.append('resume', resume);
    if (coverLetter) data.append('coverLetter', coverLetter);

    try {
      await api.post('/careers', data);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', position: '', experience: '', message: '' });
      setResume(null);
      setCoverLetter(null);
    } catch (err) {
      setStatus(err.response?.data?.error || 'Failed to connect to server.');
    }
  };

  return (
    <div>
      <Header />

      <section className="page-hero">
        <h1>Join Our Team</h1>
        <p>We're hiring skilled gas professionals across two field divisions. Build your career with Southern Gas Solutions.</p>
      </section>

      {divisions.map((div) => (
        <section className="section division-section" key={div.title}>
          <div className="division-header">
            <span className="division-icon">{div.icon}</span>
            <div>
              <h2 className="division-title">{div.title}</h2>
              <p className="division-subtitle">{div.subtitle}</p>
            </div>
          </div>
          <div className="positions-grid">
            {div.positions.map((p) => (
              <div className="position-card" key={p.role}>
                <h3>{p.role}</h3>
                <p>{p.duties}</p>
                <span className="position-tag">Full-time · Northwest Georgia</span>
                <a href="#apply" className="service-link">Apply Now →</a>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="section section-gray" id="apply">
        <div className="careers-form-container">
          <form className="careers-form" onSubmit={handleSubmit}>
            <h3>Submit Your Application</h3>
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Position *</label>
                <select name="position" value={form.position} onChange={handleChange} required>
                  <option value="">Select a position…</option>
                  <optgroup label="Above Ground">
                    {divisions[0].positions.map((p) => (
                      <option key={p.role} value={p.role}>{p.role}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Below Ground">
                    {divisions[1].positions.map((p) => (
                      <option key={p.role} value={p.role}>{p.role}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <div className="form-group">
                <label>Years of Experience</label>
                <select name="experience" value={form.experience} onChange={handleChange}>
                  <option value="">Select…</option>
                  <option>0-1 years</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Resume (PDF, DOC) *</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files[0])} required />
            </div>
            <div className="form-group">
              <label>Cover Letter (PDF, DOC)</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCoverLetter(e.target.files[0])} />
            </div>
            <div className="form-group">
              <label>Additional Info</label>
              <textarea name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Tell us about yourself…" />
            </div>
            <button className="form-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Submitting…' : 'Submit Application'}
            </button>
            {status === 'success' && <p className="quote-success">✅ Application submitted successfully!</p>}
            {status && status !== 'success' && status !== 'sending' && <p className="quote-error">❌ {status}</p>}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
