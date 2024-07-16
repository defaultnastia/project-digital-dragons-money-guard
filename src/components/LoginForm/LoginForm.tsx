import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../redux/hooks";
import { UserCredentials } from "../../redux/data.types";
import { loginFormSchema } from "../../schema/schema";
import { signIn } from "../../redux/user/operations";
import CustomModal from "../CustomModal/CustomModal";
import { CustomButton } from "../CustomButton/CustomButton";
import Logo from "../Logo/Logo";
import { Icon } from "../Icon/Icon";

import s from "./LoginForm.module.css";

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

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const userToSignIn: Omit<UserCredentials, "username"> = {
      email: data.email,
      password: data.password,
    };

    dispatch(signIn(userToSignIn));
  };

  return (
    <div className={s.wrapper}>
      {/* <div className={s.box_logo}> */}
      <Logo icon={"logo"} sizeLogo={35} sizeText={50} />
      {/* </div> */}
      <form className={s.box_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.input_box}>
          <Icon className={s.icon} name="email" size={24} />

          <input
            {...register("email", { required: true })}
            placeholder="E-mail"
            className={s.input}
          />
          {errors.email && <p className={s.error}>{errors.email.message}</p>}
        </div>
        <div className={s.input_box}>
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
        <CustomButton
          elementLike={{ btnType: "submit", onClick: handleSubmit(onSubmit) }}
          btnStyle="colorful"
        >
          LOG IN
        </CustomButton>

        <CustomButton elementLike={{ linkTo: "/register" }} btnStyle="mono">
          REGISTER
        </CustomButton>
      </form>
    </div>
  );
};

export default LoginForm;
