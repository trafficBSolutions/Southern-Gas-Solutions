import Header from "../components/headerHome";
import Footer from "../components/Footer";
import '../css/serviceAreas.css';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const cities = [
  { name: "Dalton", lat: 34.7698, lng: -84.9702, desc: "Trusted gas services for Dalton's residential and commercial properties." },
  { name: "Chatsworth", lat: 34.7659, lng: -84.7699, desc: "Reliable gas line services for the Chatsworth and Murray County area." },
  { name: "Rome", lat: 34.2570, lng: -85.1647, desc: "Professional gas piping and appliance hookups across the Rome area." },
  { name: "Calhoun", lat: 34.5026, lng: -84.9519, desc: "Serving residential and commercial properties throughout Calhoun and surrounding areas." },
  { name: "Cartersville", lat: 34.1651, lng: -84.7999, desc: "Full-service gas solutions for Cartersville homes and businesses." },
  { name: "Kennesaw", lat: 34.0234, lng: -84.6155, desc: "Professional gas piping and maintenance throughout Kennesaw." },
  { name: "Marietta", lat: 33.9526, lng: -84.5499, desc: "Comprehensive gas solutions for Marietta homes and businesses." },
  { name: "Metro Atlanta", lat: 33.7490, lng: -84.3880, desc: "Serving the greater Metro Atlanta area with professional gas services." },
];

// Polygon covering the service area (Dalton down to Metro Atlanta)
const serviceAreaBounds = [
  [34.85, -85.30],  // NW - above Rome/Dalton
  [34.85, -84.65],  // NE - above Chatsworth
  [34.60, -84.55],  // East of Chatsworth
  [34.10, -84.40],  // East of Kennesaw
  [33.65, -84.20],  // SE Atlanta
  [33.65, -84.60],  // SW Atlanta
  [34.10, -85.00],  // West of Cartersville
  [34.35, -85.30],  // West of Rome
];

const counties = [
  { name: "Whitfield County", desc: "Covering Dalton, Tunnel Hill, and all of Whitfield County." },
  { name: "Murray County", desc: "Serving Chatsworth and surrounding Murray County communities." },
  { name: "Floyd County", desc: "Serving all of Floyd County including Rome." },
  { name: "Gordon County", desc: "Covering Calhoun, Fairmount, and all of Gordon County." },
  { name: "Bartow County", desc: "Full service coverage across Cartersville and Bartow County." },
  { name: "Cobb County", desc: "Serving Kennesaw, Marietta, Acworth, and all of Cobb County." },
  { name: "Metro Atlanta", desc: "Extended coverage across the greater Metro Atlanta area." },
];

const ServiceAreas = () => (
  <div>
    <Header />

    <section className="page-hero">
      <h1>Our Service Areas</h1>
      <p>Proudly serving communities from Dalton to Metro Atlanta with professional gas services.</p>
    </section>

    <section className="section">
      <div className="accent-line" />
      <h2 className="section-title">Where We Work</h2>
      <p className="section-subtitle">Our service area spans from Northwest Georgia down through Metro Atlanta.</p>
      <div className="map-container">
        <MapContainer center={[34.25, -84.80]} zoom={8} scrollWheelZoom={false} style={{ height: '500px', width: '100%', borderRadius: '12px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polygon
            positions={serviceAreaBounds}
            pathOptions={{ color: '#e86a10', fillColor: '#e86a10', fillOpacity: 0.12, weight: 3 }}
          />
          {cities.map((c) => (
            <Marker key={c.name} position={[c.lat, c.lng]}>
              <Popup>
                <strong>{c.name}, GA</strong><br />
                {c.desc}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>

    <section className="section section-gray">
      <div className="accent-line" />
      <h2 className="section-title">Cities We Serve</h2>
      <p className="section-subtitle">Expert gas services available in these Georgia cities.</p>
      <div className="areas-grid">
        {cities.map((c) => (
          <div className="area-card" key={c.name}>
            <div className="area-type">📍 City</div>
            <h3>{c.name}, GA</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="section">
      <div className="accent-line" />
      <h2 className="section-title">Counties We Cover</h2>
      <p className="section-subtitle">Full coverage across these Georgia counties.</p>
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
