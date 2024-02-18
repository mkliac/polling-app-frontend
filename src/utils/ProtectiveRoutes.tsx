import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../App";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AppContext);
  const prevLocation = useLocation();

  if (!isLoggedIn) {
    sessionStorage.setItem("redirect", prevLocation.pathname);
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
