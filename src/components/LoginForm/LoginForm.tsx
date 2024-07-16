import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import s from "./LoginForm.module.css";
import { loginFormSchema } from "../../schema/schema";
import { Icon } from "../Icon/Icon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectErrorCode,
  selectLoadingState,
  selectUserData,
} from "../../redux/user/selectors";
import { UserCredentials } from "../../redux/data.types";
import { signIn } from "../../redux/user/operations";
import Logo from "../Logo/Logo";
import CustomModal from "../CustomModal/CustomModal";

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
  // const userData = useAppSelector(selectUserData);
  // const loading = useAppSelector(selectLoadingState);
  // const error = useAppSelector(selectErrorCode);

  // const userToSignIn: Omit<UserCredentials, "username"> = {
  //   email: "Postman15@post.com",
  //   password: "&jf7jm!jeo",
  // };

  // const handleLogin = (): void => {
  //   dispatch(signIn(userToSignIn));
  // };

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const userToSignIn: UserCredentials = {
      email: data.email,
      password: data.password,
    };

    dispatch(signIn(userToSignIn));
  };

  return (
    <div className={s.wrapper}>
      <CustomModal
        isOpen={true}
        onSubmit={handleSubmit(onSubmit)}
        type="login"
        firstBtnText="LOG IN"
        secondBtnText="REGISTER"
      >
        <div className={s.box_logo}>
          <Logo sizeLogo={26} sizeText={19} />
        </div>
        <form className={s.box_form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.form_mail}>
            <Icon className={s.icon} name="email" size={24} />

            <input
              {...register("email", { required: true })}
              placeholder="E-mail"
              className={s.input}
            />
            {errors.email && <p className={s.error}>{errors.email.message}</p>}
          </div>
          <div className={s.form_pass}>
            <Icon className={s.icon} name="lock" />
            <input
              {...register("password", { required: true })}
              placeholder="Password"
              className={s.input}
            />
            {errors.password && (
              <p className={s.error}>{errors.password.message}</p>
            )}
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default LoginForm;

// <div className="container">
// <div className={s.wrapper}>
//   <div className={s.box_logo}>
//     <Logo sizeLogo={26} sizeText={19} />
//   </div>
//   <form className={s.box_form} onSubmit={handleSubmit(onSubmit)}>
//     <div className={s.form_mail}>
//       <Icon className={s.icon} name="email" size={24} />

//       <input
//         {...register("email", { required: true })}
//         placeholder="E-mail"
//         className={s.input}
//       />
//       {errors.email && <p className={s.error}>{errors.email.message}</p>}
//     </div>
//     <div className={s.form_pass}>
//       <Icon className={s.icon} name="lock" />
//       <input
//         {...register("password", { required: true })}
//         placeholder="Password"
//         className={s.input}
//       />
//       {errors.password && (
//         <p className={s.error}>{errors.password.message}</p>
//       )}
//     </div>
//     <button className={s.btn_log} type="submit">
//       LOG IN
//     </button>
//     <div className={s.btn_reg}>
//       <Link to="/register">REGISTER</Link>
//     </div>
//   </form>
//   <div className={s.box_btn}></div>
// </div>
// </div>
