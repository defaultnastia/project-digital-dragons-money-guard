import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  refreshUser,
  signIn,
  signOut,
  signUp,
} from "../../redux/auth/operations";
import { UserCredentials } from "../../redux/data.types";

const PageNotFound = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.errorCode);

  const userToSignUp: UserCredentials = {
    username: "Postman19",
    email: "Postman19@post.com",
    password: "&jf7jm!jeo",
  };

  const userToSignIn: Omit<UserCredentials, "username"> = {
    email: "Postman15@post.com",
    password: "&jf7jm!jeo",
  };

  const handleLogin = (): void => {
    dispatch(signIn(userToSignIn));
  };

  const handleRegister = (): void => {
    dispatch(signUp(userToSignUp));
  };

  const handleRefresh = (): void => {
    dispatch(refreshUser());
  };

  const handleLogout = (): void => {
    dispatch(signOut());
  };

  return (
    <div>
      <p>The requested page is not found</p>
      <Link to="/">Return to known area</Link>
      <p>.</p>
      <p>.</p>
      <p>IS LOADING:</p>
      <p>{loading ? "Load" : "no load"}</p>
      <p>.</p>
      <p>REGISTRATION</p>
      <button onClick={handleRegister}>Register</button>
      <p>{JSON.stringify(userData)}</p>
      <p>.</p>
      <p>LOGGING OUT:</p>
      <button onClick={handleLogout}>Logout</button>
      <p>.</p>
      <p>LOGGING IN</p>
      <button onClick={handleLogin}>Login</button>
      <p>{userData ? "loggeD in" : "loggeD out"}</p>
      <p>.</p>
      <button onClick={handleRefresh}>Refresh</button>
      <p>.</p>
      <p>ERROR</p>
      <p>{`ErroR IS ${error}`}</p>
    </div>
  );
};

export default PageNotFound;
