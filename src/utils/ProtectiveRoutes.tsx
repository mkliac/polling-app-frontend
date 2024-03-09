import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { selectIsLoggedIn } from "../redux/reducers/AuthSlice";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const prevLocation = useLocation();

  if (!isLoggedIn) {
    sessionStorage.setItem("redirect", prevLocation.pathname);
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
