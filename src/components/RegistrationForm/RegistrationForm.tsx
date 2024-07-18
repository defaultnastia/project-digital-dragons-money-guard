import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerFormSchema } from "../../schema/schema";
import Logo from "../Logo/Logo";
import { Icon } from "../Icon/Icon";
import { CustomButton } from "../CustomButton/CustomButton";
import { useAppDispatch } from "../../redux/hooks";
import { signUp } from "../../redux/user/operations";
import { UserCredentials } from "../../redux/data.types";
import PasswordStrengthBar from "react-password-strength-bar-with-style-item";
import { useState } from "react";
// import s from "../LoginForm/LoginForm.module.css";
import css from "./RegistrationForm.module.css";

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerFormSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const userToSignUp: UserCredentials = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    try {
      dispatch(signUp(userToSignUp));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={css.wrapper}>
      <Logo icon={"logo"} sizeLogo={36} sizeText={27} />
      <form className={css.box_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.input_wrapper}>
          <div className={css.input_box}>
            <Icon className={css.icon} name="user" size={24} />

            <input
              {...register("username", { required: true })}
              placeholder="Name"
              className={css.input}
            />
            {errors.username && (
              <p className={css.error}>{errors.username.message}</p>
            )}
          </div>
          <div className={css.input_box}>
            <Icon className={css.icon} name="email" size={24} />

            <input
              {...register("email", { required: true })}
              placeholder="E-mail"
              className={css.input}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={css.input_box}>
            <Icon className={css.icon} name="lock" size={24} />

            <input
              {...register("password", { required: true })}
              placeholder="Password"
              className={css.input}
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className={css.passwordToggle}
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <Icon className={css.icon} name="eye-hidden" size={24} />
              ) : (
                <Icon className={css.icon} name="eye" size={24} />
              )}
            </button>
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </div>
          <div className={css.input_box}>
            <Icon className={css.icon} name="lock" size={24} />

            <input
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm password"
              className={css.input}
              type={showConfirmPassword ? "text" : "password"}
            />
            <button
              type="button"
              className={css.passwordToggle}
              onClick={toggleShowConfirmPassword}
            >
              {showConfirmPassword ? (
                <Icon className={css.icon} name="eye-hidden" size={24} />
              ) : (
                <Icon className={css.icon} name="eye" size={24} />
              )}
            </button>
            {errors.confirmPassword && (
              <p className={css.error}>{errors.confirmPassword.message}</p>
            )}
          </div>
          <PasswordStrengthBar
            password={password}
            className={css.strengthBar}
            minLength={5}
          />
          <div className={css.box_btn}>
            <CustomButton
              elementLike={{ btnType: "submit" }}
              btnStyle="colorful"
            >
              REGISTER
            </CustomButton>
            <CustomButton elementLike={{ linkTo: "/login" }} btnStyle="mono">
              LOG IN
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
