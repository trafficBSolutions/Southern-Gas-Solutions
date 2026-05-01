import Header from "../components/headerHome";
import Footer from "../components/Footer";
import '../css/home.css';
import '../css/careers.css';

const services = [
  { icon: "🔧", title: "Installation Services", desc: "Expert gas line installation for residential and commerical properties" },
  { icon: "🛠️", title: "Residential & Commercial Repairs", desc: "Fast, reliable repairs to restore safety and performance" },
  { icon: "💧", title: "Maintenance Services", desc: "Preventative maintenance to keep your gas systmes running safely and efficiently." },
  { icon: "🏢", title: "Emergency Services", desc: "24/7 emergency response for gas leaks and urgent repair. We're when you need us most." },
  { icon: "🛢️", title: "Safe. Reliable Professional", desc: "Commited to safety quality workmanship, and exceptional service on every job.." }
];

const areas = [
  "Calhoun", "Adairsville", "Cartersville", "Rome", "Dalton",
  "Chatsworth", "Canton", "Marietta", "Acworth", "Kennesaw",
  "Gordon County", "Bartow County", "Floyd County", "Whitfield County"
];

const Home = () => (
  <div>
    <Header />

<section className="home-hero">
  <div className="home-hero-overlay">
    <div className="home-hero-content">
      <h1>Reliable Gas Solutions<br />for Homes & Businesses</h1>

      <p>
        Southern Gas Solutions provides professional gas installation,
        repairs, propane connections, and emergency service across North
        Georgia and Metro Atlanta.
      </p>

      <div className="home-hero-buttons">
        <a href="/Quote" className="hero-btn-orange">Get a Free Quote</a>
        <a href="tel:4048623911" className="hero-btn-outline">Call 24/7 Emergency</a>
      </div>

      <div className="home-hero-features">
        <div>🛡️ <span>Licensed<br />& Insured</span></div>
        <div>🏠 <span>Residential &<br />Commercial</span></div>
        <div>🔥 <span>Emergency<br />Response 24/7</span></div>
        <div>📍 <span>Serving North Georgia<br />& Metro Atlanta</span></div>
      </div>
    </div>
  </div>
</section>

    {/* Services */}
<section className="home-services-section">
  <h2>Our Gas Services</h2>
  <p>Safe. Reliable. Professional.</p>

  <div className="home-services-grid">
    {services.map((s) => (
      <div className="home-service-card" key={s.title}>
        <div className="home-service-icon">{s.icon}</div>
        <h3>{s.title}</h3>
        <p>{s.desc}</p>
      </div>
    ))}
  </div>
</section>

    {/* Why Us */}
    <section className="section">
      <div className="accent-line" />
      <h2 className="section-title">Why Choose Us</h2>
      <p className="section-subtitle">Safety, quality, and reliability — that's the Southern Gas Solutions difference.</p>
      <div className="why-grid">
        <div className="why-item">
          <div className="why-icon">🛡️</div>
          <h3>Licensed &amp; Insured</h3>
          <p>Fully licensed gas professionals with comprehensive insurance coverage.</p>
        </div>
        <div className="why-item">
          <div className="why-icon">⚡</div>
          <h3>Fast Response</h3>
          <p>Quick turnaround on quotes and emergency service when you need it most.</p>
        </div>
        <div className="why-item">
          <div className="why-icon">💰</div>
          <h3>Fair Pricing</h3>
          <p>Transparent, competitive pricing with no hidden fees or surprises.</p>
        </div>
        <div className="why-item">
          <div className="why-icon">⭐</div>
          <h3>Quality Work</h3>
          <p>Every job done right the first time, backed by our satisfaction guarantee.</p>
        </div>
      </div>
    </section>

    {/* Service Areas */}
    <section className="section section-dark areas-preview">
      <div className="accent-line" />
      <h2 className="section-title">Serving Northwest Georgia</h2>
      <p className="section-subtitle">Proudly providing gas services across these communities.</p>
      <div className="areas-tags">
        {areas.map((a) => (
          <a href="/service-areas" className="area-tag" key={a}>{a}</a>
        ))}
      </div>
      <a href="/service-areas" className="btn btn-primary">View All Service Areas</a>
    </section>

    {/* Now Hiring */}
    <section className="hiring-section">
      <div className="accent-line" />
      <h2>🔥 We're Hiring!</h2>
      <p>Join our growing team of gas professionals. We offer competitive pay, benefits, and a great work environment across Northwest Georgia.</p>
      <a href="/careers" className="btn btn-primary">View Open Positions</a>
    </section>

    {/* CTA */}
    <section className="cta-banner">
      <h2>Ready to Get Started?</h2>
      <p>Contact us today for a free estimate on your gas line project.</p>
      <a href="/contact" className="btn btn-outline">Contact Us Today</a>
    </section>

    <Footer />
  </div>
);

export default Home;
