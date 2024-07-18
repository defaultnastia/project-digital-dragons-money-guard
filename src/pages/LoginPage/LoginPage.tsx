import CustomAuthModal from "../../components/CustomAuthModal/CustomAuthModal";
import LoginForm from "../../components/LoginForm/LoginForm";

import s from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={s.container}>
      <CustomAuthModal>
        <LoginForm />
      </CustomAuthModal>
    </div>
  );
};

export default LoginPage;
