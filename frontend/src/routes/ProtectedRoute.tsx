import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem("user");

  // ❌ agar user nahi
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ agar user hai
  return children;
};

export default ProtectedRoute;
