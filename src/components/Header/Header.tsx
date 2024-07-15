import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectUserData } from "../../redux/user/selectors";
import { signOut } from "../../redux/user/operations";
import CustomModal from "../CustomModal/CustomModal";
import LogoutForm from "../LogoutForm/LogoutForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "../../assets/icons.svg";
import s from "./Header.module.css";

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
        <img src="logo" alt="logo_money_guard" className="h-6 w-auto mr-2" />
        <p>Money Guard</p>
      </div>
      <div className="flex gap-3">
        <div className="username">{userData.username} Andrew</div>
        <svg className="h-5 w-5 mr-2 stroke-white">
          <use xlinkHref="icons.svg#icon-exit" />
        </svg>
        <button onClick={openModal}>Exit</button>
      </div>
      <CustomModal isOpen={modalIsOpen} onClose={closeModal} type="auth">
        <LogoutForm onSubmit={handleLogout} onClose={closeModal} />
      </CustomModal>
    </header>
  );
};

export default Header;
