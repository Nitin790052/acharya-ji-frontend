import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContexts";

const UserRoute = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "customer") return <Navigate to="/" />;

  return <Outlet />;
};

export default UserRoute;
