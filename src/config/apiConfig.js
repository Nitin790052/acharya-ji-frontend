const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  const isDevMode = import.meta.env.DEV;
  
  const isLocalhost = 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname.endsWith('.local');

  let baseApiUrl;

  if (envUrl) {
    // If VITE_API_URL is set, use it as is
    baseApiUrl = envUrl;
  } else if (isLocalhost && isDevMode) {
    // Local development fallback
    baseApiUrl = `${window.location.protocol}//${window.location.hostname}:5000/api`;
  } else {
    // Production fallback
    baseApiUrl = 'https://acharya-ji-backend.onrender.com/api';
  }

  const finalUrl = baseApiUrl.replace(/\/+$/, '');
  console.log(`[API Config] Final API_URL: ${finalUrl} (Mode: ${isDevMode ? 'DEV' : 'PROD'}, Host: ${window.location.hostname})`);
  return finalUrl;
};

const getBackendUrl = () => {
  const envUrl = import.meta.env.VITE_BACKEND_URL;
  const isDevMode = import.meta.env.DEV;
  const isLocalhost = 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.');

  let baseBackendUrl;

  if (envUrl) {
    baseBackendUrl = envUrl;
  } else if (isLocalhost && isDevMode) {
    baseBackendUrl = `${window.location.protocol}//${window.location.hostname}:5000`;
  } else {
    baseBackendUrl = 'https://acharya-ji-backend.onrender.com';
  }

  const finalUrl = baseBackendUrl.replace(/\/+$/, '');
  console.log(`[API Config] Final BACKEND_URL: ${finalUrl}`);
  return finalUrl;
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
  
  // If it's already a full URL (like Cloudinary), return it as is
  if (path.startsWith("http")) return path;
  
  // 1. Convert Windows backslashes to forward slashes
  let cleanPath = path.replace(/\\/g, "/");
  
  // 2. Remove absolute file system paths if any (for robustness)
  if (cleanPath.includes(":/")) {
    cleanPath = cleanPath.split("uploads/").pop(); // Get everything after /uploads/
    cleanPath = "uploads/" + cleanPath;
  }
  
  // 3. Ensure the path is relative to the backend base
  const finalPath = cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath;
  
  return `${BACKEND_URL}${finalPath}`;
};
