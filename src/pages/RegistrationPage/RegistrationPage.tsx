import CustomModal from "../../components/CustomModal/CustomModal";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={s.wrapper}>
      <CustomModal isOpen={true} type="auth" onClose={() => {}}>
        <RegistrationForm />
      </CustomModal>
    </div>
  );
};

export default RegistrationPage;
