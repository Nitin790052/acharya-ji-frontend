import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContexts";

const VendorRoute = ({ children }) => {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Not a vendor
  if (user.role !== "vendor") {
    return <Navigate to="/" replace />;
  }

  // Vendor but no category (safety check)
  if (!user.category) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default VendorRoute;
