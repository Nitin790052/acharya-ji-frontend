import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from './auth/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useUserAuth();
  const token = localStorage.getItem('aji_user_token') || localStorage.getItem('token');
  const savedUser = localStorage.getItem('aji_user_data') || localStorage.getItem('authUser');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Allow access if EITHER AuthContext says authenticated OR token exists in localStorage
  if (!isAuthenticated && !token && !savedUser) {
    return <Navigate to="/user_login" replace />;
  }

  return children;
};

export default ProtectedRoute;
