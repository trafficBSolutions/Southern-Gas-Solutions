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
          <li><a href="/services/gas-line-installation">Gas Line Installation</a></li>
          <li><a href="/services/gas-line-repairs">Gas Line Repairs</a></li>
          <li><a href="/services/propane-systems">Propane Systems</a></li>
          <li><a href="/services/tankless-water-heaters">Tankless Water Heaters</a></li>
        </ul>
      </div>
      <div>
        <h4>Service Areas</h4>
        <ul>
          <li><a href="/service-areas">Calhoun, GA</a></li>
          <li><a href="/service-areas">Dalton, GA</a></li>
          <li><a href="/service-areas">Rome, GA</a></li>
          <li><a href="/service-areas">Cartersville, GA</a></li>
          <li><a href="/service-areas">Marietta, GA</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>📞 (706) 555-0199</li>
          <li>✉️ info@southerngassolutions.com</li>
          <li>📍 Northwest Georgia</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Southern Gas Solutions. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
