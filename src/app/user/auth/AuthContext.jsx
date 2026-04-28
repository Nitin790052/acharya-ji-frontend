// NAYI FILE - USER KE LIYE
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('aji_user_data');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Error loading auth state from storage:", e);
      localStorage.removeItem('aji_user_data');
    }
    setLoading(false);
  }, []);

  const login = (userData, token = null) => {
    setUser(userData);
    localStorage.setItem("aji_user_data", JSON.stringify(userData));
    if (token) {
      localStorage.setItem("aji_user_token", token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aji_user_data');
    localStorage.removeItem('aji_user_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
