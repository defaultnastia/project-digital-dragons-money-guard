import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerFormSchema } from "../../schema/schema";
import CustomModal from "../CustomModal/CustomModal";
import Logo from "../Logo/Logo";
import { Icon } from "../Icon/Icon";
import { CustomButton } from "../CustomButton/CustomButton";
// import "../LoginForm/LoginForm.module.css";
import s from "./RegistrationForm.module.css";
import { useAppDispatch } from "../../redux/hooks";
import { signUp } from "../../redux/user/operations";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
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
      username: data.name,
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

  return (
    <div className="wrapper">
      <CustomModal isOpen={true} type="auth">
        <Logo icon={"logo"} sizeLogo={26} sizeText={19} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Icon name="user" size={24} />

            <input
              {...register("name", { required: true })}
              placeholder="Name"
              className={s.input}
            />
          </div>
          <div>
            <Icon name="email" size={24} />

            <input
              {...register("email", { required: true })}
              placeholder="E-mail"
              className={s.input}
            />
          </div>
          <div>
            <Icon name="lock" size={24} />

            <input
              {...register("password", { required: true })}
              placeholder="Password"
              className={s.input}
            />
          </div>
          <div>
            <Icon name="lock" size={24} />

            <input
              {...register("password", { required: true })}
              placeholder="Confirm password"
              className={s.input}
            />
          </div>
          <CustomButton elementLike={{ btnType: "submit" }} btnStyle="colorful">
            REGISTER
          </CustomButton>
          {/* <button type="submit">register</button> */}
          <CustomButton elementLike={{ linkTo: "/login" }} btnStyle="mono">
            LOG IN
          </CustomButton>
        </form>
      </CustomModal>
    </div>
  );
};

export default RegistrationForm;
