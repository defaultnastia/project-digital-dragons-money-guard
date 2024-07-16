import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../redux/hooks";
import { UserCredentials } from "../../redux/data.types";
import { loginFormSchema } from "../../schema/schema";
import { Icon } from "../Icon/Icon";
import { signIn } from "../../redux/user/operations";
import Logo from "../Logo/Logo";
import CustomModal from "../CustomModal/CustomModal";
import { CustomButton } from "../CustomButton/CustomButton";
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
    const userToSignIn: UserCredentials = {
      email: data.email,
      password: data.password,
    };

    dispatch(signIn(userToSignIn));
  };

  return (
    <div className={s.wrapper}>
      <CustomModal isOpen={true} type="auth">
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
        <CustomButton
          elementLike={{ btnType: "submit", onClick: handleSubmit(onSubmit) }}
          btnStyle="colorful"
        >
          LOG IN
        </CustomButton>

        <CustomButton elementLike={{ linkTo: "your link" }} btnStyle="mono">
          REGISTER
        </CustomButton>
      </CustomModal>
    </div>
  );
};

export default LoginForm;
