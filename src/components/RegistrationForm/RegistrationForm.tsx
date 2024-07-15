import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { registerFormSchema } from "../../schema/schema";
import "../LoginForm/LoginForm.module.css";

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
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} type="text" />
        <input {...register("email")} type="text" />
        <input {...register("password")} type="text" />
        <input {...register("confirmPassword")} type="text" />
        <button type="submit">REGISTER</button>
        <Link to="/login">LOG IN</Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
