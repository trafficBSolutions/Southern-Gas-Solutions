import {
  Home, Services, About, OurWork, ServiceAreas, Contact, Quote, Careers,
  AdminLogin, AdminDashboard, AdminQuote, AdminInvoice, ApproveQuote, ServiceDetail, NotFound,
} from './pages/index';
import { Routes, Route } from 'react-router-dom';
import './css/global.css';
import axios from 'axios';

axios.defaults.baseURL = 'https://southern-gas-server.onrender.com';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/our-work" element={<OurWork />} />
      <Route path="/service-areas" element={<ServiceAreas />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/quote" element={<Quote />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-quote" element={<AdminQuote />} />
      <Route path="/admin-invoice" element={<AdminInvoice />} />
      <Route path="/approve-quote/:token" element={<ApproveQuote />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
