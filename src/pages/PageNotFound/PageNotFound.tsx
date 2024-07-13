import { Link } from "react-router-dom";
import { signUp, UserCredentials } from "../../redux/auth/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/auth/store";
import { useEffect } from "react";
import { log } from "console";

const PageNotFound = () => {
  const userToSignUp: UserCredentials = {
    username: "Postman2",
    email: "Postman2@post.com",
    password: "&jf7jm!jeo",
  };

  const dispatch = useDispatch<AppDispatch>();

  const userData = useSelector((state: any) => state.auth.user);
  const loading = useSelector((state: any) => state.auth.loading);
  const error = useSelector((state: any) => state.auth.error);

  useEffect(() => {
    (async () => {
      const data = await dispatch(signUp(userToSignUp));
      console.log(data);
    })();
  }, []);

  return (
    <div>
      <p>The requested page is not found</p>
      <Link to="/">Return to known area</Link>
    </div>
  );
};

export default PageNotFound;
