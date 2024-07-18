import CustomAuthModal from "../../components/CustomAuthModal/CustomAuthModal";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={s.wrapper}>
      <CustomAuthModal>
        <RegistrationForm />
      </CustomAuthModal>
    </div>
  );
};

export default RegistrationPage;
