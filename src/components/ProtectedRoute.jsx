import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { userName } = useAuth();
  const token = localStorage.getItem("authToken");

  if (!token || !userName) {
    return <Navigate to="/" replace />;
  }

  return children;
}
