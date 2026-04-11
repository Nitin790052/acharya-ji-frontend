const getApiUrl = () => {
  // Check if we are running on localhost
  const isLocalhost = 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname.startsWith('10.') ||
    window.location.hostname.endsWith('.local');

  // If local, use localhost:5000 (standard for local backend)
  // If not, use the environment variable (Render)
  const baseApiUrl = isLocalhost 
    ? 'http://localhost:5000/api'
    : (import.meta.env.VITE_API_URL || 'https://acharya-ji-online-backend.onrender.com/api/');

  return baseApiUrl.replace(/\/+$/, '');
};

const getBackendUrl = () => {
  const isLocalhost = 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname.startsWith('10.') ||
    window.location.hostname.endsWith('.local');

  const baseBackendUrl = isLocalhost
    ? 'http://localhost:5000'
    : (import.meta.env.VITE_BACKEND_URL || 'https://acharya-ji-online-backend.onrender.com');

  return baseBackendUrl.replace(/\/+$/, '');
};

export const API_URL = getApiUrl();
export const BACKEND_URL = getBackendUrl();
