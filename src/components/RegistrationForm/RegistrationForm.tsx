import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerFormSchema } from "../../schema/schema";
import CustomModal from "../CustomModal/CustomModal";
import Logo from "../Logo/Logo";
import { Icon } from "../Icon/Icon";
// import "../LoginForm/LoginForm.module.css";

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

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <CustomModal
        isOpen={true}
        onSubmit={handleSubmit(onSubmit)}
        type="auth"
        firstBtnText="REGISTER"
        secondBtnText="LOG IN"
      >
        <Logo sizeLogo={26} sizeText={19} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Icon name="user" size={24} />

            <input
              {...register("user", { required: true })}
              placeholder="Name"
            />
          </div>
          <div>
            <Icon name="email" size={24} />

            <input
              {...register("email", { required: true })}
              placeholder="E-mail"
            />
          </div>
          <div>
            <Icon name="lock" size={24} />

            <input
              {...register("email", { required: true })}
              placeholder="Password"
            />
          </div>
          <div>
            <Icon name="lock" size={24} />

            <input
              {...register("email", { required: true })}
              placeholder="Confirm password"
            />
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default RegistrationForm;
