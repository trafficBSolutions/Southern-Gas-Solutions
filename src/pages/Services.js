import Header from "../components/headerHome";
import Footer from "../components/Footer";
import '../css/services.css';

const services = [
  { icon: "🔧", title: "Installation Services", desc: "Expert gas line installation for residential and commercial properties.", link: "/services/installation-services" },
  { icon: "🛠️", title: "Residential & Commercial Repairs", desc: "Fast, reliable repairs to restore safety and performance.", link: "/services/residential-commercial-repairs" },
  { icon: "💧", title: "Maintenance Services", desc: "Preventative maintenance to keep your gas systems running safely and efficiently.", link: "/services/maintenance-services" },
  { icon: "🏢", title: "Emergency Services", desc: "24/7 emergency response for gas leaks and urgent repairs. We're there when you need us most.", link: "/services/emergency-services" },
  { icon: "🛢️", title: "Safe. Reliable. Professional.", desc: "Committed to safety, quality workmanship, and exceptional service on every job.", link: "/services" },
];

const Services = () => (
  <div>
    <Header />

    <section className="page-hero">
      <h1>Our Services</h1>
      <p>Comprehensive gas solutions for residential and commercial properties across Northwest Georgia.</p>
    </section>

    <section className="section">
      <div className="accent-line" />
      <h2 className="section-title">What We Offer</h2>
      <p className="section-subtitle">From new installations to emergency repairs, we've got you covered.</p>
      <div className="services-page-grid">
        {services.map((s) => (
          <div className="service-page-card" key={s.title}>
            <div className="service-page-card-body">
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href={s.link} className="service-link">Learn More →</a>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="section section-gray">
      <div className="accent-line" />
      <h2 className="section-title">Our Process</h2>
      <p className="section-subtitle">Simple, transparent, and professional from start to finish.</p>
      <div className="process-steps">
        <div className="process-step">
          <div className="process-step-number">1</div>
          <h3>Contact Us</h3>
          <p>Reach out for a free consultation and estimate.</p>
        </div>
        <div className="process-step">
          <div className="process-step-number">2</div>
          <h3>Site Assessment</h3>
          <p>We evaluate your property and plan the best solution.</p>
        </div>
        <div className="process-step">
          <div className="process-step-number">3</div>
          <h3>Professional Install</h3>
          <p>Our licensed team completes the work safely and efficiently.</p>
        </div>
        <div className="process-step">
          <div className="process-step-number">4</div>
          <h3>Final Inspection</h3>
          <p>We test everything and ensure your complete satisfaction.</p>
        </div>
      </div>
    </section>

    <section className="cta-banner">
      <h2>Need a Gas Service?</h2>
      <p>Get a free quote today — no obligation, no hassle.</p>
      <a href="/quote" className="btn btn-outline">Get a Free Quote</a>
    </section>

    <Footer />
  </div>
);

export default Services;
