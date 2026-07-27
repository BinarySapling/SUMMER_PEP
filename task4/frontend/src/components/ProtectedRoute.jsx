import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token") || (storedUser ? JSON.parse(storedUser)?.token : null);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Get role from JWT first, fallback to stored user object
    const parsed = storedUser ? JSON.parse(storedUser) : {};
    const role = decoded.role || parsed.role;

    if (
      allowedRoles &&
      !allowedRoles.includes(role)
    ) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;