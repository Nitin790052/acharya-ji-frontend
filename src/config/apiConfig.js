const getApiUrl = () => {
  // 1. Check if VITE_API_URL is explicitly set in .env
  const envUrl = import.meta.env.VITE_API_URL;
  
  // 2. Check if we are in development mode (npm run dev)
  const isDevMode = import.meta.env.DEV;
  
  // 3. Check if we are running on a local hostname
  const isLocalhost = 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname.endsWith('.local');

  // Logic: 
  // - If we are on localhost AND in dev mode, prefer localhost:5000
  // - Otherwise, use the ENV variable if it exists
  // - Fallback to the production render URL
  let baseApiUrl = 'https://acharya-ji-backend.onrender.com/api';

  if (isLocalhost && isDevMode) {
    baseApiUrl = 'http://localhost:5000/api';
  } else if (envUrl) {
    baseApiUrl = envUrl;
  }

  return baseApiUrl.replace(/\/+$/, '');
};

const getBackendUrl = () => {
  const envUrl = import.meta.env.VITE_BACKEND_URL;
  const isDevMode = import.meta.env.DEV;
  const isLocalhost = 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.');

  let baseBackendUrl = 'https://acharya-ji-backend.onrender.com';

  if (isLocalhost && isDevMode) {
    baseBackendUrl = 'http://localhost:5000';
  } else if (envUrl) {
    baseBackendUrl = envUrl;
  }

  return baseBackendUrl.replace(/\/+$/, '');
};

export const API_URL = getApiUrl();
export const BACKEND_URL = getBackendUrl();

/**
 * Utility to get the correct URL for an image.
 * If the image path is already an absolute URL (e.g. Cloudinary), it returns it as is.
 * Otherwise, it prepends the backend URL.
 */
export const getImageUrl = (path) => {
  if (!path) return "";
  if (typeof path !== 'string') return "";
  if (path.startsWith("http")) return path;
  return `${BACKEND_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};
