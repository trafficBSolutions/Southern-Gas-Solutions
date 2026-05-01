import { useParams, Navigate } from 'react-router-dom';
import Header from '../components/headerHome';
import Footer from '../components/Footer';
import '../css/services.css';

const serviceData = {
  'installation-services': {
    title: 'Installation Services',
    icon: '🔧',
    hero: 'Expert gas line installation for residential and commercial properties.',
    description: 'Whether you\'re building new or upgrading existing systems, Southern Gas Solutions provides professional gas line installation for every need — stoves, dryers, grills, fire pits, pool heaters, generators, and more.',
    features: [
      'New construction gas line rough-ins',
      'Appliance hookups (stoves, dryers, water heaters)',
      'Outdoor gas lines for grills, fire pits & pool heaters',
      'Generator gas connections',
      'CSST & black iron pipe installation',
      'Code-compliant work with full inspections',
    ],
  },
  'residential-commercial-repairs': {
    title: 'Residential & Commercial Repairs',
    icon: '🛠️',
    hero: 'Fast, reliable repairs to restore safety and performance.',
    description: 'From small leaks to major line damage, our licensed technicians diagnose and repair gas issues quickly and safely. We serve both residential homes and commercial facilities across Northwest Georgia.',
    features: [
      'Gas leak detection & repair',
      'Pressure testing & diagnostics',
      'Damaged line replacement',
      'Regulator & valve repairs',
      'Commercial kitchen gas repairs',
      'Insurance & warranty documentation',
    ],
  },
  'maintenance-services': {
    title: 'Maintenance Services',
    icon: '💧',
    hero: 'Preventative maintenance to keep your gas systems running safely and efficiently.',
    description: 'Regular maintenance prevents costly repairs and dangerous leaks. We offer scheduled inspections and tune-ups for residential and commercial gas systems to keep everything running at peak performance.',
    features: [
      'Annual gas system inspections',
      'Pressure testing & leak checks',
      'Appliance safety inspections',
      'Regulator & meter checks',
      'Corrosion prevention',
      'Maintenance plans for commercial properties',
    ],
  },
  'emergency-services': {
    title: 'Emergency Services',
    icon: '🏢',
    hero: '24/7 emergency response for gas leaks and urgent repairs.',
    description: 'Gas emergencies don\'t wait — and neither do we. Our emergency response team is available around the clock to handle gas leaks, shutoffs, and urgent safety concerns. Call us anytime, day or night.',
    features: [
      '24/7 emergency dispatch',
      'Rapid gas leak response',
      'Emergency shutoff & isolation',
      'Safety assessments & clearance',
      'Temporary & permanent repair solutions',
      'Coordination with local fire & utility departments',
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = serviceData[slug];

  if (!service) return <Navigate to="/services" replace />;

  return (
    <div>
      <Header />

      <section className="page-hero">
        <h1>{service.icon} {service.title}</h1>
        <p>{service.hero}</p>
      </section>

      <section className="section">
        <div className="service-detail-content">
          <div className="accent-line" />
          <h2 className="section-title">About This Service</h2>
          <p className="service-detail-desc">{service.description}</p>

          <div className="service-features-grid">
            {service.features.map((f, i) => (
              <div className="service-feature" key={i}>
                <span className="service-feature-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <h2>Ready to Get Started?</h2>
        <p>Get a free quote for {service.title.toLowerCase()} — no obligation, no hassle.</p>
        <a href={`/quote?service=${encodeURIComponent(service.title)}`} className="btn btn-outline">Get a Free Quote</a>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
