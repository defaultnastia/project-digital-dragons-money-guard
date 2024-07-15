import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/user/selectors";
import { useAppSelector } from "../redux/hooks";

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

const RestrictedRoute = ({ children, redirectTo = "/dashboard" }: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
