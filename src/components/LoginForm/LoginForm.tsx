import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { loginFormSchema } from "../../schema/schema";
import { Icon } from "../Icon/Icon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { signIn } from "../../redux/auth/operations";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(loginFormSchema) });

  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.user);
  // const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.errorCode);

  const userToSignIn: Omit<UserCredentials, "username"> = {
    email: "Postman15@post.com",
    password: "&jf7jm!jeo",
  };

  const handleLogin = (): void => {
    dispatch(signIn(userToSignIn));
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = (userToSignIn) => {
    dispatch(signIn(userToSignIn));
  };

  return (
    <div className="wrapper">
      <div className="logo_wrap">
        <Icon name="logo" size={26} />
        <p className="logo_text">Money Guard</p>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input_mail">
          <Icon className="email" name="email" size={24} />

          <input
            {...register("email", { required: true })}
            placeholder="E-mail"
            className="input"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="input_mail">
          <Icon />
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            className="input"
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <button className="btn_log" type="submit">
          LOG IN
        </button>
        <span className="btn_reg">
          <Link to="/register">REGISTER</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
