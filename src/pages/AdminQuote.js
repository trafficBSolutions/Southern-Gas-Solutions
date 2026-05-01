import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/headerHome';
import Footer from '../components/Footer';
import api from '../utils/api';
import '../css/admin.css';

const money = (n) => `$${(Number(n) || 0).toFixed(2)}`;
const blankRow = () => ({ id: crypto.randomUUID(), item: '', description: '', taxable: true, qty: 1, unitPrice: 0 });

const services = [
  'Installation Services', 'Residential & Commercial Repairs', 'Maintenance Services', 'Emergency Services',
];

const AdminQuote = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem('sgs_token');

  useEffect(() => { if (!token) navigate('/admin-login'); }, [token, navigate]);

  const [customer, setCustomer] = useState(searchParams.get('name') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [phone, setPhone] = useState(searchParams.get('phone') || '');
  const [service, setService] = useState(searchParams.get('service') || '');
  const [taxRate, setTaxRate] = useState(0.08);
  const [isTaxExempt, setIsTaxExempt] = useState(false);
  const [rows, setRows] = useState([blankRow()]);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const updateRow = (id, patch) => setRows(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
  const addRow = () => setRows(prev => [...prev, blankRow()]);
  const removeRow = (id) => setRows(prev => prev.filter(r => r.id !== id));

  const computed = useMemo(() => {
    const lineTotals = rows.map(r => (Number(r.qty) || 0) * (Number(r.unitPrice) || 0));
    const subtotal = lineTotals.reduce((s, v) => s + v, 0);
    const taxableSubtotal = isTaxExempt ? 0 : rows.reduce((s, r, i) => r.taxable ? s + lineTotals[i] : s, 0);
    const taxDue = taxableSubtotal * (Number(taxRate) || 0);
    const total = isTaxExempt ? subtotal : subtotal + taxDue;
    return { lineTotals, subtotal, taxDue, total };
  }, [rows, taxRate, isTaxExempt]);

  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    setPhone(raw.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'));
  };

  const handleSend = async () => {
    if (!email || !customer) { setMessage('Customer name and email are required.'); return; }
    setSending(true);
    setMessage('');
    try {
      await api.post('/admin-quotes', {
        customer, email, phone, service, rows, taxRate, isTaxExempt,
        subtotal: computed.subtotal, taxDue: computed.taxDue, total: computed.total,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Quote sent successfully!');
      setTimeout(() => navigate('/admin-dashboard'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to send quote.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-quote-page">
        <h1>Create & Send Quote</h1>

        <div className="aq-section">
          <h3>Customer Info</h3>
          <div className="aq-row">
            <div className="form-group">
              <label>Customer Name *</label>
              <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="aq-row">
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" value={phone} onChange={handlePhoneChange} />
            </div>
            <div className="form-group">
              <label>Service</label>
              <select value={service} onChange={(e) => setService(e.target.value)}>
                <option value="">Select a service…</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="aq-section">
          <h3>Tax Settings</h3>
          <div className="aq-row">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={isTaxExempt} onChange={(e) => setIsTaxExempt(e.target.checked)} />
              Tax Exempt
            </label>
            <div className="form-group">
              <label>Tax Rate</label>
              <input type="number" step="0.001" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="aq-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0 }}>Line Items</h3>
            <button className="btn btn-primary" onClick={addRow} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>+ Add Line</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="aq-table">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>DESCRIPTION</th>
                  <th style={{ width: 70 }}>TAX?</th>
                  <th style={{ width: 70 }}>QTY</th>
                  <th style={{ width: 100 }}>UNIT PRICE</th>
                  <th style={{ width: 100 }}>TOTAL</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={r.id}>
                    <td><input value={r.item} onChange={(e) => updateRow(r.id, { item: e.target.value })} placeholder="e.g., Gas Line" /></td>
                    <td><input value={r.description} onChange={(e) => updateRow(r.id, { description: e.target.value })} placeholder="Details..." /></td>
                    <td className="center">
                      <select value={isTaxExempt ? 'No' : r.taxable ? 'Yes' : 'No'} onChange={(e) => updateRow(r.id, { taxable: e.target.value === 'Yes' })} disabled={isTaxExempt}>
                        <option>Yes</option><option>No</option>
                      </select>
                    </td>
                    <td><input type="number" min="0" value={r.qty} onChange={(e) => updateRow(r.id, { qty: Number(e.target.value) })} /></td>
                    <td><input type="number" step="0.01" min="0" value={r.unitPrice} onChange={(e) => updateRow(r.id, { unitPrice: Number(e.target.value) })} /></td>
                    <td className="right">{money(computed.lineTotals[idx])}</td>
                    <td className="center"><button className="icon-btn" onClick={() => removeRow(r.id)}>✕</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="aq-section">
          <div className="aq-totals">
            <div className="aq-totals-box">
              <div className="row"><span>Subtotal</span><strong>{money(computed.subtotal)}</strong></div>
              <div className="row"><span>Tax</span><strong>{money(computed.taxDue)}</strong></div>
              <div className="row total"><span>TOTAL</span><strong>{money(computed.total)}</strong></div>
            </div>
          </div>
          <div className="aq-send">
            <button className="btn btn-primary" onClick={handleSend} disabled={sending}>
              {sending ? 'Sending…' : 'Send Quote to Customer'}
            </button>
            {message && <p style={{ marginTop: 12, color: message.includes('success') ? '#16a34a' : 'var(--flame)', fontWeight: 600 }}>{message}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminQuote;
