import { Home, Services, About, OurWork, ServiceAreas, Contact } from './pages/index';
import { Routes, Route } from 'react-router-dom';
import './css/global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/our-work" element={<OurWork />} />
      <Route path="/service-areas" element={<ServiceAreas />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
