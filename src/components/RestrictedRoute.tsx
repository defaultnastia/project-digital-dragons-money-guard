import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

const RestrictedRoute = ({ children, redirectTo = "/dashboard" }: Props) => {
  const isLoggedIn = false; //mocked
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
