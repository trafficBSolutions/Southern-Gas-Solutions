import '../css/footer.css';
const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <h4>Southern Gas Solutions</h4>
        <p>Licensed gas professionals serving Northwest Georgia. Residential and commercial gas line installation, repair, and maintenance.</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="/services/installation-services">Installation Services</a></li>
          <li><a href="/services/residential-commercial-repairs">Repairs</a></li>
          <li><a href="/services/maintenance-services">Maintenance</a></li>
          <li><a href="/services/emergency-services">Emergency Services</a></li>
        </ul>
      </div>
      <div>
        <h4>Service Areas</h4>
        <ul>
          <li><a href="/service-areas">Dalton, GA</a></li>
          <li><a href="/service-areas">Chatsworth, GA</a></li>
          <li><a href="/service-areas">Rome, GA</a></li>
          <li><a href="/service-areas">Calhoun, GA</a></li>
          <li><a href="/service-areas">Cartersville, GA</a></li>
          <li><a href="/service-areas">Kennesaw, GA</a></li>
          <li><a href="/service-areas">Marietta, GA</a></li>
          <li><a href="/service-areas">Metro Atlanta</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>📞 (404) 862-3911</li>
          <li>✉️ devon@southerngassolutions.com</li>
          <li>📍 Northwest Georgia</li>
        </ul>
      </div>
    </div>
<div className="footer-copyright">
      <p className="footer-copy-p">&copy; 2026 Southern Gas Solutions LLC - 
         Website Created by <a className="footer-face" href="https://www.material-worx.com/portfolio" target="_blank" rel="noopener noreferrer">MX Systems</a> - All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
