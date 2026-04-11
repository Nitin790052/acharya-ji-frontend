import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/vendor/auth/AuthContext";

const VendorRouteGuard = ({ children }) => {
  const { loading, isLoggedIn, isVendor } = useAuth();

  // ⏳ wait until auth restore
  if (loading) return null;

  // ❌ not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ❌ wrong role
  if (!isVendor) {
    return <Navigate to="/" replace />;
  }

  // ✅ allowed
  return children;
};

export default VendorRouteGuard;
