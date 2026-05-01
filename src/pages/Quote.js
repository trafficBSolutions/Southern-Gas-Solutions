import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Header from '../components/headerHome';
import Footer from '../components/Footer';
import api from '../utils/api';
import '../css/quote.css';

const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const services = [
  'Gas Line Installation', 'Gas Line Repairs', 'Propane Systems',
  'Tankless Water Heaters', 'Commercial Gas Piping', 'Emergency Gas Service', 'Gas Logs & Fireplaces',
];

const Quote = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', details: '' });
  const [status, setStatus] = useState(null);
  const captchaRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captchaToken = captchaRef.current?.getValue();
    if (!captchaToken) { setStatus('Please complete the reCAPTCHA.'); return; }
    setStatus('sending');
    try {
      await api.post('/quote', { ...form, captchaToken });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', details: '' });
      captchaRef.current?.reset();
    } catch (err) {
      setStatus(err.response?.data?.error || 'Failed to connect to server.');
    }
  };

  return (
    <div>
      <Header />

      <section className="page-hero">
        <h1>Get a Free Quote</h1>
        <p>Select a service and tell us about your project — we'll get back to you promptly.</p>
      </section>

      <section className="section">
        <div className="quote-container">
          <form className="quote-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Service *</label>
              <select name="service" value={form.service} onChange={handleChange} required>
                <option value="">Select a service…</option>
                {services.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Project Details</label>
              <textarea name="details" rows="5" value={form.details} onChange={handleChange} placeholder="Describe your project or questions…" />
            </div>
            <div className="form-group">
              <ReCAPTCHA sitekey={SITE_KEY} ref={captchaRef} />
            </div>
            <button className="form-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Request Quote'}
            </button>
            {status === 'success' && <p className="quote-success">✅ Your quote request has been submitted!</p>}
            {status && status !== 'success' && status !== 'sending' && <p className="quote-error">❌ {status}</p>}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quote;
