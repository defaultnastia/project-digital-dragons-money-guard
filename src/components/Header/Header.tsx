import { useState } from "react";
import { selectUserData } from "../../redux/user/selectors";
import { signOut } from "../../redux/user/operations";
import CustomModal from "../CustomModal/CustomModal";
import LogoutForm from "../LogoutForm/LogoutForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "../../img/icons.svg";
import s from "./Header.module.css";
import Logo from "../Logo/Logo";
import { Icon } from "../Icon/Icon";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useAppDispatch();
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
    } catch (error) {
      alert("Failed to log out. Please try again.");
    }
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <header
      className={clsx(
        s.header,
        "flex justify-between items-center",
        { "p-4 ": isDesktop },
        { "py-4 px-8": isTablet },
        { "py-3 px-5": isMobile }
      )}
    >
      <div className="flex flex-col items-center">
        <Logo sizeLogo={24} sizeText={17} icon="logo" />
      </div>
      <div className="flex gap-3">
        <p className="text-[rgba(255,255,255,0.6)]">{userData.username}</p>
        <div>
          <button
            onClick={openModal}
            className={clsx(
              "text-[rgba(255,255,255,0.6)] flex gap-[8px] pl-2 border-l-[1px] border-[rgba(255,255,255,0.6)] items-center text-[16px]",
              { "border-none pl-0": isMobile }
            )}
          >
            <Icon name="exit" size={18} />
            {(isDesktop || isTablet) && "Exit"}
          </button>
        </div>
      </div>
      <CustomModal isOpen={modalIsOpen} onClose={closeModal} type="auth">
        <LogoutForm onSubmit={handleLogout} onClose={closeModal} />
      </CustomModal>
    </header>
  );
};

export default Header;
