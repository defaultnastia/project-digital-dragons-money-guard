import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
  const isLoggedIn = false; //mocked
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
