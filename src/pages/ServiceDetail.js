import { useState } from 'react';
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
    whyUs: [
      { icon: '🛡️', title: 'Licensed & Insured', desc: 'Every installation is performed by licensed gas professionals with full insurance coverage.' },
      { icon: '📋', title: 'Permit & Code Compliant', desc: 'We handle all permits and ensure every install meets Georgia gas codes.' },
      { icon: '⚡', title: 'Fast Turnaround', desc: 'Most residential installations completed in a single day.' },
      { icon: '💰', title: 'Upfront Pricing', desc: 'No hidden fees — you know the cost before we start.' },
    ],
    process: [
      { step: 1, title: 'Free Consultation', desc: 'We assess your property and discuss your gas line needs.' },
      { step: 2, title: 'Custom Quote', desc: 'You receive a detailed, no-obligation quote.' },
      { step: 3, title: 'Professional Install', desc: 'Our licensed crew completes the installation safely and efficiently.' },
      { step: 4, title: 'Inspection & Testing', desc: 'We pressure test everything and ensure full code compliance.' },
    ],
    faqs: [
      { q: 'How long does a gas line installation take?', a: 'Most residential installations are completed in one day. Larger commercial projects may take 2–3 days.' },
      { q: 'Do you handle permits?', a: 'Yes — we pull all necessary permits and schedule inspections as part of the job.' },
      { q: 'What types of pipe do you use?', a: 'We install CSST (flexible) and black iron pipe depending on the application and code requirements.' },
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
    whyUs: [
      { icon: '🔍', title: 'Expert Diagnostics', desc: 'We use advanced leak detection equipment to pinpoint issues fast.' },
      { icon: '🏠', title: 'Residential & Commercial', desc: 'From single-family homes to restaurant kitchens — we handle it all.' },
      { icon: '📄', title: 'Documentation Provided', desc: 'Full repair reports for insurance claims and warranty records.' },
      { icon: '🚨', title: 'Same-Day Service', desc: 'Most repairs completed the same day you call.' },
    ],
    process: [
      { step: 1, title: 'Report the Issue', desc: 'Call us or submit a quote request describing the problem.' },
      { step: 2, title: 'Diagnosis', desc: 'We inspect and pressure test to identify the exact issue.' },
      { step: 3, title: 'Repair', desc: 'Our technicians fix the problem using code-compliant materials.' },
      { step: 4, title: 'Verification', desc: 'We re-test the system and provide documentation of the repair.' },
    ],
    faqs: [
      { q: 'How do I know if I have a gas leak?', a: 'Signs include a rotten egg smell, hissing sounds near gas lines, dead vegetation near a line, or higher-than-normal gas bills. If you suspect a leak, leave the area and call us immediately.' },
      { q: 'Do you repair commercial gas systems?', a: 'Yes — we service restaurants, warehouses, and commercial facilities of all sizes.' },
      { q: 'Will my insurance cover the repair?', a: 'Many homeowner and commercial policies cover gas line repairs. We provide full documentation to support your claim.' },
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
    whyUs: [
      { icon: '📅', title: 'Scheduled Plans', desc: 'Set it and forget it — we\'ll remind you when it\'s time for service.' },
      { icon: '🔒', title: 'Safety First', desc: 'Catch small issues before they become dangerous or expensive.' },
      { icon: '📉', title: 'Lower Bills', desc: 'Well-maintained systems run more efficiently, saving you money.' },
      { icon: '✅', title: 'Peace of Mind', desc: 'Know your gas system is safe and up to code year-round.' },
    ],
    process: [
      { step: 1, title: 'Schedule Service', desc: 'Book a maintenance visit at a time that works for you.' },
      { step: 2, title: 'Full Inspection', desc: 'We check every component — lines, regulators, meters, and appliances.' },
      { step: 3, title: 'Report & Recommendations', desc: 'You get a detailed report with any findings or suggestions.' },
      { step: 4, title: 'Ongoing Plan', desc: 'Opt into a maintenance plan for regular scheduled visits.' },
    ],
    faqs: [
      { q: 'How often should gas lines be inspected?', a: 'We recommend annual inspections for residential properties and semi-annual for commercial facilities.' },
      { q: 'What does a maintenance visit include?', a: 'A full pressure test, visual inspection of all gas lines, regulator and meter checks, and appliance connection inspections.' },
      { q: 'Do you offer maintenance contracts?', a: 'Yes — we offer annual and semi-annual maintenance plans with priority scheduling and discounted rates.' },
    ],
  },
  'emergency-services': {
    title: 'Emergency Services',
    icon: '🚨',
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
    whyUs: [
      { icon: '⏰', title: 'Available 24/7', desc: 'Day, night, weekends, holidays — we\'re always on call.' },
      { icon: '🚗', title: 'Fast Response Time', desc: 'We dispatch immediately and arrive as quickly as possible.' },
      { icon: '🛡️', title: 'Safety Certified', desc: 'Our emergency techs are trained for high-pressure safety situations.' },
      { icon: '📞', title: 'One Call Does It All', desc: 'We handle everything from shutoff to final repair.' },
    ],
    process: [
      { step: 1, title: 'Call (404) 862-3911', desc: 'Describe the emergency — we dispatch immediately.' },
      { step: 2, title: 'Secure the Area', desc: 'Our team arrives, isolates the leak, and ensures safety.' },
      { step: 3, title: 'Emergency Repair', desc: 'We fix the issue on-site or install a temporary solution.' },
      { step: 4, title: 'Follow-Up', desc: 'We schedule any needed permanent repairs and provide documentation.' },
    ],
    faqs: [
      { q: 'What should I do if I smell gas?', a: 'Leave the area immediately. Do not use light switches, phones, or anything that could create a spark. Once you\'re safely outside, call us at (404) 862-3911.' },
      { q: 'How fast can you respond?', a: 'We dispatch immediately upon receiving your call. Response times vary by location but we prioritize all emergency calls.' },
      { q: 'Is there an extra charge for after-hours service?', a: 'Emergency rates may apply for after-hours calls. We\'ll always communicate pricing before starting any work.' },
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = serviceData[slug];
  const [openFaq, setOpenFaq] = useState(null);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <div>
      <Header />

      <section className="page-hero">
        <h1>{service.icon} {service.title}</h1>
        <p>{service.hero}</p>
      </section>

      {/* About */}
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

      {/* Why Choose Us */}
      <section className="section section-gray">
        <div className="accent-line" />
        <h2 className="section-title">Why Choose Us</h2>
        <p className="section-subtitle">The Southern Gas Solutions difference.</p>
        <div className="sd-why-grid">
          {service.whyUs.map((w, i) => (
            <div className="sd-why-card" key={i}>
              <div className="sd-why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="accent-line" />
        <h2 className="section-title">Our Process</h2>
        <p className="section-subtitle">Simple, transparent, and professional from start to finish.</p>
        <div className="sd-process-grid">
          {service.process.map((p) => (
            <div className="sd-process-step" key={p.step}>
              <div className="sd-process-num">{p.step}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-gray">
        <div className="accent-line" />
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="sd-faq-list">
          {service.faqs.map((f, i) => (
            <div className={`sd-faq-item ${openFaq === i ? 'open' : ''}`} key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="sd-faq-q">
                <span>{f.q}</span>
                <span className="sd-faq-toggle">{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && <div className="sd-faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <h2>Ready to Get Started?</h2>
        <p>Get a free quote for {service.title.toLowerCase()} — no obligation, no hassle.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`/quote?service=${encodeURIComponent(service.title)}`} className="btn btn-outline">Get a Free Quote</a>
          <a href="tel:4048623911" className="btn btn-outline">📞 Call (404) 862-3911</a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
