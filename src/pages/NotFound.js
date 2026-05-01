import Header from '../components/headerHome';
import Footer from '../components/Footer';

const NotFound = () => (
  <div>
    <Header />
    <section className="page-hero" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1>404</h1>
      <p style={{ fontSize: '1.3rem', marginBottom: 24 }}>The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary" style={{ margin: '0 auto' }}>Back to Home</a>
    </section>
    <Footer />
  </div>
);

export default NotFound;
