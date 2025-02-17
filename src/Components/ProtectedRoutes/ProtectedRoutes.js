import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const authToken = localStorage.getItem("authToken"); // Get token

  return authToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
