import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectUserData } from "../../redux/user/selectors";
import { signOut } from "../../redux/user/operations";
import CustomModal from "../CustomModal/CustomModal";
import LogoutForm from "../LogoutForm/LogoutForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "../../images/icons.svg";
import s from "./Header.module.css";
import MyLogo from "../../pages/DashboardPage/MyLogo";
import { MyIcon } from "../../pages/DashboardPage/MyIcon";

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleLogout = async () => {
    try {
      await dispatch(signOut());
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <header className={s.header}>
      <div className="flex flex-col items-center">
        <MyLogo sizeLogo={24} sizeText={17} className="h-6 w-auto mr-2" />
      </div>
      <div className="flex gap-3">
        <div className="username">{userData.username}</div>
        <MyIcon name="icon-exit" size={18} className="exit" />
        <button onClick={openModal}>Exit</button>
      </div>
      <CustomModal isOpen={modalIsOpen} onClose={closeModal} type="auth">
        <LogoutForm onSubmit={handleLogout} onClose={closeModal} />
      </CustomModal>
    </header>
  );
};

export default Header;
