import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn: boolean = useSelector(
    (state: { isLoggedIn: boolean }) => state.isLoggedIn
  );
  const prevLocation = useLocation();

  if (!isLoggedIn) {
    sessionStorage.setItem("redirect", prevLocation.pathname);
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
