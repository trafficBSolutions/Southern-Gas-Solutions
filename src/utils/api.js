import axios from 'axios';

const api = axios.create({
  baseURL: 'https://southern-gas-server.onrender.com/api',
  withCredentials: true,
});

export default api;
