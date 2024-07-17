import CustomModal from "../../components/CustomModal/CustomModal";
import LoginForm from "../../components/LoginForm/LoginForm";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={s.container}>
      <CustomModal isOpen={true} type="auth" onClose={() => {}}>
        <LoginForm />
      </CustomModal>
    </div>
  );
};

export default LoginPage;
