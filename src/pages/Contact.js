import Header from "../components/headerHome";
import Footer from "../components/Footer";
import '../css/contact.css';

const Contact = () => (
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
              <p>(706) 555-0199</p>
            </div>
          </div>

          <div className="contact-detail">
            <div className="contact-detail-icon">✉️</div>
            <div>
              <h4>Email</h4>
              <p>info@southerngassolutions.com</p>
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

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <h3>Request a Free Quote</h3>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your full name" />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="(xxx) xxx-xxxx" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label>Service Needed</label>
            <select defaultValue="">
              <option value="" disabled>Select a service</option>
              <option>Gas Line Installation</option>
              <option>Gas Line Repairs</option>
              <option>Propane Systems</option>
              <option>Tankless Water Heaters</option>
              <option>Commercial Gas Piping</option>
              <option>Emergency Gas Service</option>
              <option>Gas Logs &amp; Fireplaces</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Tell us about your project..." />
          </div>
          <button type="submit" className="form-submit">Send Request</button>
        </form>
      </div>
    </section>

    <Footer />
  </div>
);

export default Contact;
