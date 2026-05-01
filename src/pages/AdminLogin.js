import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../css/admin.css';

const SESSION_DURATION = 14 * 24 * 60 * 60 * 1000; // 2 weeks

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('sgs_token');
    const loginTime = localStorage.getItem('sgs_login_time');
    if (token && loginTime && (Date.now() - Number(loginTime)) < SESSION_DURATION) {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('sgs_token', data.token);
      localStorage.setItem('sgs_admin', JSON.stringify(data.admin));
      localStorage.setItem('sgs_login_time', String(Date.now()));
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>🔒 Admin Login</h1>
        <p>Southern Gas Solutions Dashboard</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="form-submit" type="submit">Sign In</button>
          {error && <p className="admin-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
