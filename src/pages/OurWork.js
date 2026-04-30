import Header from "../components/headerHome";
import Footer from "../components/Footer";
import '../css/ourWork.css';

const projects = [
  { icon: "🔧", title: "Residential Gas Line Install", location: "Calhoun, GA", desc: "Complete gas line installation for a new construction home including stove, dryer, and water heater hookups." },
  { icon: "🔥", title: "Gas Fireplace Installation", location: "Dalton, GA", desc: "Ventless gas fireplace installation with new gas line run from the meter." },
  { icon: "🏢", title: "Commercial Kitchen Piping", location: "Rome, GA", desc: "Full commercial gas piping for a new restaurant with multiple appliance connections." },
  { icon: "💧", title: "Tankless Water Heater", location: "Cartersville, GA", desc: "Tankless water heater installation with gas line upgrade for improved flow." },
  { icon: "🏠", title: "Propane System Conversion", location: "Chatsworth, GA", desc: "Whole-home propane system conversion from electric with new underground line." },
  { icon: "🛠️", title: "Gas Leak Repair", location: "Marietta, GA", desc: "Emergency gas leak detection and repair for a residential property." },
];

const OurWork = () => (
  <div>
    <Header />

    <section className="page-hero">
      <h1>Our Work</h1>
      <p>See examples of our completed projects across Northwest Georgia.</p>
    </section>

    <section className="section">
      <div className="accent-line" />
      <h2 className="section-title">Recent Projects</h2>
      <p className="section-subtitle">Quality workmanship on every job, big or small.</p>
      <div className="work-grid">
        {projects.map((p) => (
          <div className="work-card" key={p.title}>
            <div className="work-card-img">{p.icon}</div>
            <div className="work-card-body">
              <h3>{p.title}</h3>
              <div className="work-location">📍 {p.location}</div>
              <p>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="cta-banner">
      <h2>Want to See Your Project Here?</h2>
      <p>Contact us to get started on your gas line project today.</p>
      <a href="/contact" className="btn btn-outline">Get a Free Quote</a>
    </section>

    <Footer />
  </div>
);

export default OurWork;
