import Header from "../components/headerHome";
import Footer from "../components/Footer";
import '../css/about.css';

const About = () => (
  <div>
    <Header />

    <section className="page-hero">
      <h1>About Us</h1>
      <p>Learn about the team behind Southern Gas Solutions.</p>
    </section>

    <section className="section">
      <div className="about-content">
        <div className="about-text">
          <h2>Your Trusted Gas Professionals</h2>
          <p>Southern Gas Solutions is a licensed and insured gas company serving Northwest Georgia. We specialize in residential and commercial gas line installation, repair, and maintenance.</p>
          <p>Our team brings years of hands-on experience to every project. Whether you need a simple appliance hookup or a complete commercial gas piping system, we deliver safe, code-compliant work you can count on.</p>
          <p>We proudly serve Calhoun, Dalton, Rome, Cartersville, Marietta, and communities throughout Gordon, Bartow, Floyd, and Whitfield counties.</p>
          <a href="/contact" className="btn btn-primary" style={{ marginTop: 16 }}>Get in Touch</a>
        </div>
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600" alt="Gas professional at work" />
        </div>
      </div>
    </section>

    <section className="section section-gray">
      <div className="accent-line" />
      <h2 className="section-title">Our Values</h2>
      <p className="section-subtitle">What drives us every day.</p>
      <div className="values-grid">
        <div className="value-card">
          <div className="value-icon">🛡️</div>
          <h3>Safety First</h3>
          <p>Every job is completed to the highest safety standards and local codes.</p>
        </div>
        <div className="value-card">
          <div className="value-icon">🤝</div>
          <h3>Integrity</h3>
          <p>Honest pricing, clear communication, and no shortcuts — ever.</p>
        </div>
        <div className="value-card">
          <div className="value-icon">🏆</div>
          <h3>Excellence</h3>
          <p>We take pride in delivering quality workmanship on every project.</p>
        </div>
      </div>
    </section>

    <section className="cta-banner">
      <h2>Ready to Work With Us?</h2>
      <p>Contact us for a free consultation and estimate.</p>
      <a href="/contact" className="btn btn-outline">Contact Us</a>
    </section>

    <Footer />
  </div>
);

export default About;
