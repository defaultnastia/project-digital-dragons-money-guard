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
      <Link className="underline" to="/">
        Return to known area
      </Link>
      <p>.</p>
      <p>.</p>
      <p>MOCKS:</p>
      <p>.</p>
      <p>.</p>
      <p>{loading ? "loading" : "loading finished"}</p>
      <p>.</p>
      <button className="border p-1" onClick={handleRegister}>
        Register
      </button>
      <p>.</p>
      <button className="border p-1" onClick={handleLogout}>
        Logout
      </button>
      <p>.</p>
      <button className="border p-1" onClick={handleLogin}>
        Login
      </button>
      <p>.</p>
      <p>
        {userData.username
          ? "User is logged in"
          : "User is logged out (but try refresh)"}
      </p>
      <p>{JSON.stringify(userData)}</p>
      <p>.</p>
      <button className="border p-1" onClick={handleRefresh}>
        Refresh
      </button>
      <p>.</p>
      <p>{error ? `Error is ${error}` : "No errors happened"}</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>
        All buttons are working. <br /> For the register you have to change
        "userToSignUp" data to unique email
      </p>
    </div>
  );
};

export default PageNotFound;
