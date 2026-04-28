import { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "aji_vendor_data";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =================================
  // Restore session on refresh
  // =================================
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (err) {
      console.error("Auth parse error:", err);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  // =================================
  // LOGIN
  // =================================
  const login = (userData) => {
    if (!userData) return;

    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  // =================================
  // LOGOUT
  // =================================
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  // =================================
  // HELPERS
  // =================================
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
      isLoggedIn: !!user,
      isVendor: user?.role === "vendor",
      vendorType: user?.vendorType || null,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
