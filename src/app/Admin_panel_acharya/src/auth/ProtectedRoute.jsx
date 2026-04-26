import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#666e4d]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-acharya" replace />;
  }

  return children;
};

export default ProtectedRoute;
