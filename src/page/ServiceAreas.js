import Header from "../components/headerHome";
import Footer from "../components/Footer";
import '../css/serviceAreas.css';

const cities = [
  { name: "Calhoun", desc: "Serving residential and commercial properties throughout Calhoun and surrounding areas." },
  { name: "Adairsville", desc: "Gas line installation, repairs, and maintenance for the Adairsville community." },
  { name: "Cartersville", desc: "Full-service gas solutions for Cartersville homes and businesses." },
  { name: "Rome", desc: "Professional gas piping and appliance hookups across the Rome area." },
  { name: "Dalton", desc: "Trusted gas services for Dalton's residential and commercial properties." },
  { name: "Chatsworth", desc: "Reliable gas line services for the Chatsworth and Murray County area." },
  { name: "Canton", desc: "Expert gas installation and repair services in Canton and Cherokee County." },
  { name: "Marietta", desc: "Comprehensive gas solutions for Marietta homes and businesses." },
  { name: "Acworth", desc: "Gas line installation and emergency services for the Acworth community." },
  { name: "Kennesaw", desc: "Professional gas piping and maintenance throughout Kennesaw." },
];

const counties = [
  { name: "Gordon County", desc: "Covering all cities and communities within Gordon County." },
  { name: "Bartow County", desc: "Full service coverage across Bartow County." },
  { name: "Floyd County", desc: "Serving all of Floyd County and surrounding areas." },
  { name: "Whitfield County", desc: "Complete gas services throughout Whitfield County." },
];

const ServiceAreas = () => (
  <div>
    <Header />

    <section className="page-hero">
      <h1>Our Service Areas</h1>
      <p>Proudly serving communities across Northwest Georgia with professional gas line services.</p>
    </section>

    <section className="section">
      <div className="accent-line" />
      <h2 className="section-title">Cities We Serve</h2>
      <p className="section-subtitle">Expert gas services available in these Georgia cities.</p>
      <div className="areas-grid">
        {cities.map((c) => (
          <div className="area-card" key={c.name}>
            <div className="area-type">City</div>
            <h3>{c.name}, GA</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="section section-gray">
      <div className="accent-line" />
      <h2 className="section-title">Counties We Serve</h2>
      <p className="section-subtitle">Full coverage across these Northwest Georgia counties.</p>
      <div className="counties-grid">
        {counties.map((c) => (
          <div className="county-card" key={c.name}>
            <h3>{c.name}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="cta-banner">
      <h2>Don't See Your Area?</h2>
      <p>Contact us — we may still be able to serve your location.</p>
      <a href="/contact" className="btn btn-outline">Contact Us</a>
    </section>

    <Footer />
  </div>
);

export default ServiceAreas;
