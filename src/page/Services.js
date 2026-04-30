import Header from "../components/headerHome";
import Footer from "../components/Footer";
import '../css/services.css';

const services = [
  { icon: "🔧", title: "Gas Line Installation", desc: "New gas line installation for stoves, dryers, grills, fire pits, pool heaters, generators, and more.", link: "/services/gas-line-installation" },
  { icon: "🛠️", title: "Gas Line Repairs", desc: "Expert leak detection and gas line repair services to keep your property safe.", link: "/services/gas-line-repairs" },
  { icon: "🏠", title: "Propane Systems", desc: "Propane system installation, conversion, and maintenance for residential and commercial use.", link: "/services/propane-systems" },
  { icon: "💧", title: "Tankless Water Heaters", desc: "Energy-efficient tankless water heater installation, replacement, and servicing.", link: "/services/tankless-water-heaters" },
  { icon: "🏢", title: "Commercial Gas Piping", desc: "Commercial-grade gas piping for restaurants, warehouses, and industrial facilities.", link: "/services/commercial-gas-piping" },
  { icon: "🚨", title: "Emergency Gas Service", desc: "24/7 emergency gas line service for urgent leaks and safety concerns.", link: "/services/emergency-gas-service" },
  { icon: "🔥", title: "Gas Logs & Fireplaces", desc: "Gas log sets and fireplace installation for efficient, beautiful heating.", link: "/services/gas-logs-fireplaces" },
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
      <a href="/contact" className="btn btn-outline">Get a Free Quote</a>
    </section>

    <Footer />
  </div>
);

export default Services;
