import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { selectIsLoggedIn } from "../redux/reducers/AuthSlice";

const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const prevLocation = useLocation();

  if (!isLoggedIn) {
    sessionStorage.setItem("redirect", prevLocation.pathname);
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
