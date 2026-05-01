import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Header from "../components/headerHome";
import Footer from "../components/Footer";
import api from '../utils/api';
import '../css/contact.css';

const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState(null);
  const captchaRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captchaToken = captchaRef.current?.getValue();
    if (!captchaToken) { setStatus('Please complete the reCAPTCHA.'); return; }
    setStatus('sending');
    try {
      await api.post('/contact', { ...form, captchaToken });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      captchaRef.current?.reset();
    } catch (err) {
      setStatus(err.response?.data?.error || 'Failed to connect to server.');
    }
  };

  return (
    <div>
      <Header />

      <section className="page-hero">
        <h1>Contact Us</h1>
        <p>Get in touch for a free estimate or to schedule a service.</p>
      </section>

      <section className="section">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Let's Talk About Your Project</h2>
            <p>Whether you need a new gas line, a repair, or just have questions — we're here to help. Reach out and we'll get back to you promptly.</p>

            <div className="contact-detail">
              <div className="contact-detail-icon">📞</div>
              <div>
                <h4>Phone</h4>
                <p>(404) 862-3911</p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">✉️</div>
              <div>
                <h4>Email</h4>
                <p>devon@southerngassolutions.com</p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">📍</div>
              <div>
                <h4>Service Area</h4>
                <p>Northwest Georgia — Calhoun, Dalton, Rome, Cartersville, Marietta &amp; more</p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">🕐</div>
              <div>
                <h4>Hours</h4>
                <p>Mon–Fri: 7:00 AM – 6:00 PM<br />Sat: 8:00 AM – 2:00 PM<br />Emergency service available 24/7</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Request a Free Quote</h3>
            <div className="form-group">
              <label>Name</label>
              <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" type="tel" placeholder="(xxx) xxx-xxxx" value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Service Needed</label>
              <select name="service" value={form.service} onChange={handleChange}>
                <option value="">Select a service</option>
                <option>Installation Services</option>
                <option>Residential &amp; Commercial Repairs</option>
                <option>Maintenance Services</option>
                <option>Emergency Services</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" placeholder="Tell us about your project..." value={form.message} onChange={handleChange} />
            </div>
            <div className="form-group">
              <ReCAPTCHA sitekey={SITE_KEY} ref={captchaRef} />
            </div>
            <button type="submit" className="form-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Request'}
            </button>
            {status === 'success' && <p className="quote-success">✅ Message sent successfully!</p>}
            {status && status !== 'success' && status !== 'sending' && <p className="quote-error">❌ {status}</p>}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
