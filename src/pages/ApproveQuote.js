import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/headerHome';
import Footer from '../components/Footer';
import api from '../utils/api';
import '../css/admin.css';

const money = (n) => `$${(Number(n) || 0).toFixed(2)}`;

const ApproveQuote = () => {
  const { token } = useParams();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState([]);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState(null);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());

  useEffect(() => {
    api.get(`/admin-quotes/token/${token}`)
      .then(r => setQuote(r.data))
      .catch(() => setQuote(false))
      .finally(() => setLoading(false));
  }, [token]);

  const toggleDate = (dateStr) => {
    setSelectedDates(prev => prev.includes(dateStr) ? prev.filter(d => d !== dateStr) : [...prev, dateStr]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDates.length === 0) { setStatus('Please select at least one date.'); return; }
    if (!address.trim()) { setStatus('Please enter the job site address.'); return; }
    setStatus('submitting');
    try {
      await api.post('/jobs', { token, dates: selectedDates, address, notes });
      setStatus('success');
    } catch (err) {
      setStatus(err.response?.data?.error || 'Failed to schedule. Please try again.');
    }
  };

  // Calendar
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthName = new Date(calYear, calMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

  if (loading) return <div style={{ padding: 200, textAlign: 'center' }}>Loading...</div>;
  if (quote === false) return (
    <div>
      <Header />
      <div className="approve-page" style={{ textAlign: 'center', paddingTop: 160 }}>
        <h1>Quote Not Found</h1>
        <p>This quote link may be invalid or expired.</p>
      </div>
      <Footer />
    </div>
  );

  if (quote.status === 'approved') return (
    <div>
      <Header />
      <div className="approve-page" style={{ textAlign: 'center', paddingTop: 160 }}>
        <h1>✅ Quote Already Approved</h1>
        <p>This quote has already been approved and a job has been scheduled. We'll be in touch!</p>
      </div>
      <Footer />
    </div>
  );

  if (status === 'success') return (
    <div>
      <Header />
      <div className="approve-page" style={{ textAlign: 'center', paddingTop: 160 }}>
        <h1>✅ Job Scheduled!</h1>
        <p>Thank you, {quote.customer}! Your job has been scheduled. You'll receive a confirmation email shortly.</p>
        <p style={{ color: 'var(--gray)', marginTop: 12 }}>Selected date(s): {selectedDates.join(', ')}</p>
      </div>
      <Footer />
    </div>
  );

  return (
    <div>
      <Header />
      <div className="approve-page">
        <h1>Approve Your Quote</h1>
        <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Review your quote, pick your preferred date(s), and confirm to schedule.</p>

        <div className="approve-summary">
          <h3>Quote for {quote.customer}</h3>
          {quote.service && <p style={{ color: 'var(--gray)', marginBottom: 8 }}>Service: {quote.service}</p>}
          <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eef1f5' }}>
                <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--navy)' }}>Item</th>
                <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--navy)' }}>Description</th>
                <th style={{ textAlign: 'center', padding: '8px 0', color: 'var(--navy)' }}>Qty</th>
                <th style={{ textAlign: 'right', padding: '8px 0', color: 'var(--navy)' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {(quote.rows || []).map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eef1f5' }}>
                  <td style={{ padding: '8px 0' }}>{r.item}</td>
                  <td style={{ padding: '8px 0', color: 'var(--gray)' }}>{r.description}</td>
                  <td style={{ padding: '8px 0', textAlign: 'center' }}>{r.qty}</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600 }}>{money((r.qty || 0) * (r.unitPrice || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'right', marginTop: 12 }}>
            <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Subtotal: {money(quote.subtotal)}</div>
            <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Tax: {money(quote.taxDue)}</div>
            <div className="approve-total">Total: {money(quote.total)}</div>
          </div>
        </div>

        <div className="approve-summary">
          <h3>📅 Select Date(s)</h3>
          <div className="cal-nav">
            <button onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); }}>← Prev</button>
            <h4>{monthName}</h4>
            <button onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); }}>Next →</button>
          </div>
          <div className="date-picker-grid">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="date-header">{d}</div>)}
            {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dateObj = new Date(calYear, calMonth, day);
              const isPast = dateObj < today;
              const isSelected = selectedDates.includes(dateStr);
              return (
                <div
                  key={day}
                  className={`date-cell ${isSelected ? 'selected' : ''} ${isPast ? 'disabled' : ''}`}
                  onClick={() => !isPast && toggleDate(dateStr)}
                >
                  {day}
                </div>
              );
            })}
          </div>
          {selectedDates.length > 0 && (
            <p style={{ fontSize: '0.85rem', color: 'var(--navy)', fontWeight: 600 }}>
              Selected: {selectedDates.sort().join(', ')}
            </p>
          )}
        </div>

        <form className="approve-summary" onSubmit={handleSubmit}>
          <h3>📍 Job Details</h3>
          <div className="form-group">
            <label>Job Site Address *</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, Calhoun, GA 30701" required />
          </div>
          <div className="form-group">
            <label>Additional Notes</label>
            <textarea rows="4" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Gate code, special instructions, etc." />
          </div>
          <button className="form-submit" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Scheduling…' : '✅ Approve & Schedule Job'}
          </button>
          {status && status !== 'submitting' && status !== 'success' && (
            <p style={{ marginTop: 12, color: 'var(--flame)', fontWeight: 600, textAlign: 'center' }}>❌ {status}</p>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ApproveQuote;
