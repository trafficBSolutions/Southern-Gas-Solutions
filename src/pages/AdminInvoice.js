import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/headerHome';
import Footer from '../components/Footer';
import api from '../utils/api';
import { formatPhone } from '../utils/formatPhone';
import priceCatalog, { areaPricingZones, getPriceForArea, jobTypes } from '../data/priceCatalog';
import '../css/admin.css';

const money = (n) => `$${(Number(n) || 0).toFixed(2)}`;
const blankRow = () => ({ id: crypto.randomUUID(), item: '', description: '', unit: '', jobType: '', taxable: true, qty: 1, unitPrice: 0, notes: '' });

const services = [
  'Installation Services', 'Residential & Commercial Repairs', 'Maintenance Services', 'Emergency Services',
];

const AdminInvoice = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem('sgs_token');

  useEffect(() => { if (!token) navigate('/admin-login'); }, [token, navigate]);

  const [customer, setCustomer] = useState(searchParams.get('name') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [phone, setPhone] = useState(searchParams.get('phone') || '');
  const [jobAddress, setJobAddress] = useState('');
  const [county, setCounty] = useState('');
  const [area, setArea] = useState('North GA / Local');
  const [service, setService] = useState(searchParams.get('service') || '');
  const [jobType, setJobType] = useState('');
  const [profitMargin, setProfitMargin] = useState('40%');
  const [taxRate, setTaxRate] = useState(0.08);
  const [isTaxExempt, setIsTaxExempt] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [permitFee, setPermitFee] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [rows, setRows] = useState([blankRow()]);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const updateRow = (id, patch) => setRows(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
  const addRow = () => setRows(prev => [...prev, blankRow()]);
  const removeRow = (id) => setRows(prev => prev.filter(r => r.id !== id));

  const addFromCatalog = (catalogItem) => {
    const price = getPriceForArea(catalogItem, area);
    setRows(prev => [...prev, {
      id: crypto.randomUUID(),
      item: catalogItem.shortName,
      description: catalogItem.name,
      unit: catalogItem.unit,
      jobType: catalogItem.jobType,
      taxable: true,
      qty: 1,
      unitPrice: price,
      notes: catalogItem.notes,
    }]);
  };

  const computed = useMemo(() => {
    const lineTotals = rows.map(r => (Number(r.qty) || 0) * (Number(r.unitPrice) || 0));
    const subtotal = lineTotals.reduce((s, v) => s + v, 0);
    const taxableSubtotal = isTaxExempt ? 0 : rows.reduce((s, r, i) => r.taxable ? s + lineTotals[i] : s, 0);
    const taxDue = taxableSubtotal * (Number(taxRate) || 0);
    const afterDiscount = subtotal - (Number(discount) || 0) + (Number(permitFee) || 0);
    const total = isTaxExempt ? afterDiscount : afterDiscount + taxDue;
    return { lineTotals, subtotal, taxDue, total };
  }, [rows, taxRate, isTaxExempt, discount, permitFee]);

  useEffect(() => {
    setRows(prev => prev.map(r => {
      const catalogMatch = priceCatalog.find(c => c.shortName === r.item);
      if (catalogMatch) {
        return { ...r, unitPrice: getPriceForArea(catalogMatch, area) };
      }
      return r;
    }));
  }, [area]);

  const handlePhoneChange = (e) => setPhone(formatPhone(e.target.value));

  const handleSend = async () => {
    if (!email || !customer) { setMessage('Customer name and email are required.'); return; }
    setSending(true);
    setMessage('');
    try {
      await api.post('/invoices', {
        customer, email, phone, jobAddress, county, area, service, jobType, profitMargin,
        rows, taxRate, isTaxExempt, discount, permitFee, dueDate: dueDate || undefined, notes,
        subtotal: computed.subtotal, taxDue: computed.taxDue, total: computed.total,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Invoice sent successfully!');
      setTimeout(() => navigate('/admin-dashboard'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to send invoice.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-quote-page">
        <h1>Create & Send Invoice</h1>

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
              <input type="tel" value={phone} onChange={handlePhoneChange} placeholder="(XXX) XXX-XXXX" maxLength={14} />
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
          <h3>Job Details</h3>
          <div className="aq-row">
            <div className="form-group">
              <label>Job Address</label>
              <input value={jobAddress} onChange={(e) => setJobAddress(e.target.value)} placeholder="123 Main St, City, GA" />
            </div>
            <div className="form-group">
              <label>County / Area</label>
              <input value={county} onChange={(e) => setCounty(e.target.value)} placeholder="e.g., Fulton, Cherokee" />
            </div>
          </div>
          <div className="aq-row">
            <div className="form-group">
              <label>Area Pricing Zone</label>
              <select value={area} onChange={(e) => setArea(e.target.value)}>
                {areaPricingZones.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Job Type</label>
              <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                <option value="">Select…</option>
                {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Target Profit Margin</label>
              <select value={profitMargin} onChange={(e) => setProfitMargin(e.target.value)}>
                <option value="35%">35%</option>
                <option value="40%">40%</option>
                <option value="45%">45%</option>
                <option value="50%">50%</option>
              </select>
            </div>
          </div>
        </div>

        <div className="aq-section">
          <h3>Tax, Fees & Payment</h3>
          <div className="aq-row">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={isTaxExempt} onChange={(e) => setIsTaxExempt(e.target.checked)} />
              Tax Exempt
            </label>
            <div className="form-group">
              <label>Tax Rate</label>
              <input type="number" step="0.001" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Discount ($)</label>
              <input type="number" step="0.01" min="0" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Permit / Inspection ($)</label>
              <input type="number" step="0.01" min="0" value={permitFee} onChange={(e) => setPermitFee(Number(e.target.value))} />
            </div>
          </div>
          <div className="aq-row" style={{ marginTop: 16 }}>
            <div className="form-group">
              <label>Due Date</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Notes (shown on invoice)</label>
              <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Payment terms, special instructions..." />
            </div>
          </div>
        </div>

        <div className="aq-section">
          <h3>Quick Add from Price List</h3>
          <p style={{ fontSize: '0.85rem', color: '#6b7a8d', margin: '0 0 12px' }}>
            Click an item to add it with <strong>{area}</strong> pricing.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {priceCatalog.map(item => (
              <button
                key={item.sku}
                className="btn btn-outline"
                onClick={() => addFromCatalog(item)}
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                title={`${item.name} — ${money(getPriceForArea(item, area))}`}
              >
                {item.shortName} ({money(getPriceForArea(item, area))})
              </button>
            ))}
          </div>
        </div>

        <div className="aq-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0 }}>Line Items</h3>
            <button className="btn btn-primary" onClick={addRow} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>+ Add Blank Line</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="aq-table">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>DESCRIPTION</th>
                  <th style={{ width: 80 }}>UNIT</th>
                  <th style={{ width: 70 }}>TAX?</th>
                  <th style={{ width: 60 }}>QTY</th>
                  <th style={{ width: 100 }}>UNIT PRICE</th>
                  <th style={{ width: 100 }}>TOTAL</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={r.id}>
                    <td><input value={r.item} onChange={(e) => updateRow(r.id, { item: e.target.value })} placeholder="e.g., Gas Drop" /></td>
                    <td><input value={r.description} onChange={(e) => updateRow(r.id, { description: e.target.value })} placeholder="Details..." /></td>
                    <td><input value={r.unit || ''} onChange={(e) => updateRow(r.id, { unit: e.target.value })} placeholder="Each" style={{ fontSize: '0.8rem' }} /></td>
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
              {discount > 0 && <div className="row"><span>Discount</span><strong>-{money(discount)}</strong></div>}
              {permitFee > 0 && <div className="row"><span>Permit/Inspection</span><strong>{money(permitFee)}</strong></div>}
              <div className="row"><span>Tax</span><strong>{money(computed.taxDue)}</strong></div>
              <div className="row total"><span>TOTAL DUE</span><strong>{money(computed.total)}</strong></div>
            </div>
          </div>
          <div className="aq-send">
            <button className="btn btn-primary" onClick={handleSend} disabled={sending}>
              {sending ? 'Sending…' : 'Send Invoice to Customer'}
            </button>
            {message && <p style={{ marginTop: 12, color: message.includes('success') ? '#16a34a' : 'var(--flame)', fontWeight: 600 }}>{message}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminInvoice;
