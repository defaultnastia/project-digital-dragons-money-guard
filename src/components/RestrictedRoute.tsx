import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ children, redirectTo = "/dashboard" }) => {
  const isLoggedIn = false; //mocked
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
