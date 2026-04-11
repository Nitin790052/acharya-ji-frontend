import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from './auth/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading,user } = useUserAuth();
  console.log("User:", user);
console.log("Auth:", isAuthenticated);
console.log("Loading:", loading);
//   console.log("User:", user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/user_login" replace />;
  }

  return children;
};

export default ProtectedRoute;