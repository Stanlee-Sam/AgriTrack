import { Navigate } from "react-router-dom";
import { getToken, getUser } from "./lib/auth";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) return <Navigate to="/login" />;
  if (userRole !== role) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
