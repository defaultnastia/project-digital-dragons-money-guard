import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectIsLoggedIn } from "../redux/user/selectors";

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

const PrivateRoute = ({ children, redirectTo = "/login" }: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
