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
import s from "../LoginForm/LoginForm.module.css";
import css from "./RegistrationForm.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  // const passwordStrength = ({ password }) => {
  //   let strength = 0;
  //   if (password.length > 5) strength + 1;
  //   if (password.match(/[a-z]+/)) strength + 1;
  //   if (password.match(/[A-Z]+/)) strength + 1;
  //   if (password.match(/[0-9]+/)) strength + 1;
  //   if (password.match(/[^a-zA-Z0-9]+/)) strength + 1;
  //   return strength;
  // };

  return (
    <div className="wrapper">
      <Logo icon={"logo"} sizeLogo={26} sizeText={19} />

      <form className={s.box_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.input_box}>
          <Icon className={s.icon} name="user" size={24} />

          <input
            {...register("username", { required: true })}
            placeholder="Name"
            className={s.input}
          />
          {errors.username && (
            <p className={s.error}>{errors.username.message}</p>
          )}
        </div>
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
          <Icon className={s.icon} name="lock" size={24} />

          <input
            {...register("password", { required: true })}
            placeholder="Password"
            className={s.input}
            type={showPassword ? "text" : "password"}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className={css.passwordToggle}
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <Icon className={s.icon} name="eye-hidden" size={24} />
            ) : (
              <Icon className={s.icon} name="eye" size={24} />
            )}
          </button>
          {errors.password && (
            <p className={s.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={s.input_box}>
          <Icon className={s.icon} name="lock" size={24} />

          <input
            {...register("confirmPassword", { required: true })}
            placeholder="Confirm password"
            className={s.input}
            type={showConfirmPassword ? "text" : "password"}
          />
          <button
            type="button"
            className={css.passwordToggle}
            onClick={toggleShowConfirmPassword}
          >
            {showConfirmPassword ? (
              <Icon className={s.icon} name="eye-hidden" size={24} />
            ) : (
              <Icon className={s.icon} name="eye" size={24} />
            )}
          </button>
          {errors.confirmPassword && (
            <p className={s.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className={s.strengthBarContainer}>
          <PasswordStrengthBar
            password={password}
            className={s.strengthBar}
            minLength={5}
          />
        </div>
        <div>
          <CustomButton elementLike={{ btnType: "submit" }} btnStyle="colorful">
            REGISTER
          </CustomButton>
          <CustomButton elementLike={{ linkTo: "/login" }} btnStyle="mono">
            LOG IN
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
