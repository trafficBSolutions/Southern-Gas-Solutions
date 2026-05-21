import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/headerHome';
import Footer from '../components/Footer';
import api from '../utils/api';
import { formatPhone } from '../utils/formatPhone';
import '../css/admin.css';

const money = (n) => `$${(Number(n) || 0).toFixed(2)}`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [customerQuotes, setCustomerQuotes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [expandedQuote, setExpandedQuote] = useState(null);
  const [expandedApp, setExpandedApp] = useState(null);
  const [expandedContact, setExpandedContact] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('sgs_token');
    const loginTime = localStorage.getItem('sgs_login_time');
    const SESSION_DURATION = 14 * 24 * 60 * 60 * 1000;
    if (!token || !loginTime || (Date.now() - Number(loginTime)) > SESSION_DURATION) {
      localStorage.removeItem('sgs_token');
      localStorage.removeItem('sgs_admin');
      localStorage.removeItem('sgs_login_time');
      navigate('/admin-login');
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    api.get('/admin-quotes', { headers }).then(r => setQuotes(r.data)).catch(() => {});
    api.get('/quote', { headers }).then(r => setCustomerQuotes(r.data)).catch(() => {});
    api.get('/contact', { headers }).then(r => setContacts(r.data)).catch(() => {});
    api.get('/careers', { headers }).then(r => setApplications(r.data)).catch(() => {});
    api.get('/jobs', { headers }).then(r => setJobs(r.data)).catch(() => {});
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('sgs_token');
    localStorage.removeItem('sgs_admin');
    localStorage.removeItem('sgs_login_time');
    navigate('/admin-login');
  };

  const today = new Date();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const monthName = new Date(calYear, calMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

  const jobsByDate = useMemo(() => {
    const map = {};
    jobs.forEach(j => {
      (j.dates || []).forEach(d => {
        if (!map[d]) map[d] = [];
        map[d].push(j);
      });
    });
    return map;
  }, [jobs]);

  const monthlyJobCount = useMemo(() => {
    return Object.entries(jobsByDate).reduce((sum, [date, list]) => {
      if (date.startsWith(`${calYear}-${String(calMonth + 1).padStart(2, '0')}`)) return sum + list.length;
      return sum;
    }, 0);
  }, [jobsByDate, calMonth, calYear]);

  const selectedDateJobs = selectedDate ? (jobsByDate[selectedDate] || []) : [];

  const calCells = [];
  for (let i = 0; i < firstDay; i++) calCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calCells.push(d);

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); setSelectedDate(null); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); setSelectedDate(null); };

  return (
    <div>
      <Header />
      <div className="admin-dash">
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage quotes, contacts, applications, and scheduled jobs.</p>
          </div>
          <button className="btn btn-primary" onClick={handleLogout} style={{ height: 'fit-content' }}>Logout</button>
        </div>

        {/* Stats + Actions */}
        <div className="dash-stats-row">
          <div className="stat-chip"><span className="stat-label">Jobs This Month</span><span className="stat-value">{monthlyJobCount}</span></div>
          <div className="stat-chip"><span className="stat-label">Quote Requests</span><span className="stat-value">{customerQuotes.length}</span></div>
          <div className="stat-chip"><span className="stat-label">Applications</span><span className="stat-value">{applications.length}</span></div>
          <div className="stat-chip"><span className="stat-label">Contacts</span><span className="stat-value">{contacts.length}</span></div>
        </div>

        <div className="admin-actions">
          <a href="/admin-quote" className="btn btn-primary">+ Create Quote</a>
          <a href="/admin-invoice" className="btn btn-primary">+ Create Invoice</a>
        </div>

        {/* Calendar + Job Detail side-by-side */}
        <div className="dash-card dash-card-full" style={{ marginBottom: 24 }}>
          <h3>📅 Job Calendar</h3>
          <div className="cal-layout">
            <div className="cal-left">
              <div className="cal-nav">
                <button onClick={prevMonth}>← Prev</button>
                <h4>{monthName}</h4>
                <button onClick={nextMonth}>Next →</button>
              </div>
              <div className="calendar-wrap">
                <table className="calendar">
                  <thead>
                    <tr>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <th key={d}>{d}</th>)}</tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: Math.ceil(calCells.length / 7) }, (_, week) => (
                      <tr key={week}>
                        {calCells.slice(week * 7, week * 7 + 7).map((day, i) => {
                          if (!day) return <td key={i} className="empty" />;
                          const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                          const isToday = today.getFullYear() === calYear && today.getMonth() === calMonth && today.getDate() === day;
                          const isSelected = selectedDate === dateStr;
                          const count = (jobsByDate[dateStr] || []).length;
                          return (
                            <td key={i} className={`${isToday ? 'today' : ''} ${isSelected ? 'cal-selected' : ''} ${count > 0 ? 'has-jobs' : ''}`} onClick={() => setSelectedDate(dateStr)} style={{ cursor: 'pointer' }}>
                              <div className="cal-day-num">{day}</div>
                              {count > 0 && <div className="cal-job-count">{count} Job{count > 1 ? 's' : ''}</div>}
                            </td>
                          );
                        })}
                        {week === Math.ceil(calCells.length / 7) - 1 && calCells.length % 7 !== 0 &&
                          Array.from({ length: 7 - (calCells.length % 7) }, (_, i) => <td key={`e${i}`} className="empty" />)
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right panel — jobs for selected date */}
            <div className="cal-right">
              {selectedDate ? (
                <>
                  <h4 className="cal-right-title">Jobs on {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h4>
                  {selectedDateJobs.length === 0 ? (
                    <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>No jobs scheduled for this date.</p>
                  ) : (
                    <div className="cal-job-list">
                      {selectedDateJobs.map((j) => (
                        <div className="cal-job-card" key={j._id}>
                          <h4>{j.customer}</h4>
                          <p><strong>Service:</strong> {j.service}</p>
                          <p><strong>Email:</strong> <a href={`mailto:${j.email}`} style={{ color: 'var(--orange)' }}>{j.email}</a></p>
                          {j.phone && <p><strong>Phone:</strong> <a href={`tel:${j.phone}`} style={{ color: 'var(--orange)' }}>{formatPhone(j.phone)}</a></p>}
                          <p><strong>Address:</strong> {j.address}</p>
                          {j.notes && <p><strong>Notes:</strong> {j.notes}</p>}
                          <p><strong>Total:</strong> {money(j.total)}</p>
                          <span className={`dash-badge badge-${j.status}`}>{j.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--gray)' }}>
                  <p style={{ fontSize: '2rem', marginBottom: 8 }}>📅</p>
                  <p>Click a date to view scheduled jobs</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="dash-grid">
          {/* Customer Quote Requests */}
          <div className="dash-card dash-card-full">
            <h3>📩 Customer Quote Requests</h3>
            <ul className="dash-list">
              {customerQuotes.length === 0 && <li><div className="dash-list-info"><span>No quote requests yet</span></div></li>}
              {customerQuotes.slice(0, 10).map(q => (
                <li key={q._id} style={{ flexDirection: 'column', alignItems: 'stretch', cursor: 'pointer' }} onClick={() => setExpandedQuote(expandedQuote === q._id ? null : q._id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="dash-list-info">
                      <strong>{q.name}</strong>
                      <span>{q.service} · {q.email} · {new Date(q.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{expandedQuote === q._id ? '▲' : '▼'}</span>
                  </div>
                  {expandedQuote === q._id && (
                    <div className="quote-detail-expand">
                      <div className="quote-detail-grid">
                        <div><strong>Name:</strong> {q.name}</div>
                        <div><strong>Email:</strong> <a href={`mailto:${q.email}`} style={{ color: 'var(--orange)' }}>{q.email}</a></div>
                        <div><strong>Phone:</strong> {q.phone ? <a href={`tel:${q.phone}`} style={{ color: 'var(--orange)' }}>{formatPhone(q.phone)}</a> : 'N/A'}</div>
                        <div><strong>Service:</strong> {q.service}</div>
                      </div>
                      {q.details && <div style={{ marginTop: 8 }}><strong>Details:</strong><p style={{ margin: '4px 0 0', color: 'var(--gray-dark)', fontSize: '0.88rem', lineHeight: 1.5 }}>{q.details}</p></div>}
                      <button className="btn btn-primary" style={{ marginTop: 12, padding: '10px 20px', fontSize: '0.85rem' }} onClick={(e) => { e.stopPropagation(); navigate(`/admin-quote?name=${encodeURIComponent(q.name)}&email=${encodeURIComponent(q.email)}&phone=${encodeURIComponent(formatPhone(q.phone || ''))}&service=${encodeURIComponent(q.service || '')}`); }}>
                        Create Quote for {q.name}
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Quotes Sent */}
          <div className="dash-card">
            <h3>🔧 Quotes Sent</h3>
            <ul className="dash-list">
              {quotes.length === 0 && <li><div className="dash-list-info"><span>No quotes yet</span></div></li>}
              {quotes.slice(0, 8).map(q => (
                <li key={q._id}>
                  <div className="dash-list-info">
                    <strong>{q.customer}</strong>
                    <span>{q.service} · {money(q.total)}</span>
                  </div>
                  <span className={`dash-badge badge-${q.status}`}>{q.status}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Contacts */}
          <div className="dash-card dash-card-full">
            <h3>✉️ Recent Contacts</h3>
            <ul className="dash-list">
              {contacts.length === 0 && <li><div className="dash-list-info"><span>No contacts yet</span></div></li>}
              {contacts.slice(0, 10).map(c => (
                <li key={c._id} style={{ flexDirection: 'column', alignItems: 'stretch', cursor: 'pointer' }} onClick={() => setExpandedContact(expandedContact === c._id ? null : c._id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="dash-list-info">
                      <strong>{c.name}</strong>
                      <span>{c.email} · {c.service || 'General'} · {new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{expandedContact === c._id ? '▲' : '▼'}</span>
                  </div>
                  {expandedContact === c._id && (
                    <div className="quote-detail-expand">
                      <div className="quote-detail-grid">
                        <div><strong>Name:</strong> {c.name}</div>
                        <div><strong>Email:</strong> <a href={`mailto:${c.email}`} style={{ color: 'var(--orange)' }}>{c.email}</a></div>
                        <div><strong>Phone:</strong> {c.phone ? <a href={`tel:${c.phone}`} style={{ color: 'var(--orange)' }}>{formatPhone(c.phone)}</a> : 'N/A'}</div>
                        <div><strong>Service:</strong> {c.service || 'General'}</div>
                      </div>
                      {c.message && <div style={{ marginTop: 8 }}><strong>Message:</strong><p style={{ margin: '4px 0 0', color: 'var(--gray-dark)', fontSize: '0.88rem', lineHeight: 1.5 }}>{c.message}</p></div>}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Job Applications */}
          <div className="dash-card dash-card-full">
            <h3>👷 Job Applications</h3>
            <ul className="dash-list">
              {applications.length === 0 && <li><div className="dash-list-info"><span>No applications yet</span></div></li>}
              {applications.slice(0, 10).map(a => (
                <li key={a._id} style={{ flexDirection: 'column', alignItems: 'stretch', cursor: 'pointer' }} onClick={() => setExpandedApp(expandedApp === a._id ? null : a._id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="dash-list-info">
                      <strong>{a.name}</strong>
                      <span>{a.position} · {a.experience || 'N/A'} · {new Date(a.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{expandedApp === a._id ? '▲' : '▼'}</span>
                  </div>
                  {expandedApp === a._id && (
                    <div className="quote-detail-expand">
                      <div className="quote-detail-grid">
                        <div><strong>Name:</strong> {a.name}</div>
                        <div><strong>Email:</strong> <a href={`mailto:${a.email}`} style={{ color: 'var(--orange)' }}>{a.email}</a></div>
                        <div><strong>Phone:</strong> {a.phone ? <a href={`tel:${a.phone}`} style={{ color: 'var(--orange)' }}>{formatPhone(a.phone)}</a> : 'N/A'}</div>
                        <div><strong>Position:</strong> {a.position}</div>
                        <div><strong>Experience:</strong> {a.experience || 'N/A'}</div>
                        <div><strong>Resume:</strong> {a.resume ? `📎 ${a.resume}` : 'Not provided'}</div>
                        <div><strong>Cover Letter:</strong> {a.coverLetter ? `📎 ${a.coverLetter}` : 'Not provided'}</div>
                      </div>
                      {a.message && <div style={{ marginTop: 8 }}><strong>Additional Info:</strong><p style={{ margin: '4px 0 0', color: 'var(--gray-dark)', fontSize: '0.88rem', lineHeight: 1.5 }}>{a.message}</p></div>}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
