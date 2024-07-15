import React from "react";
import Modal from "react-modal";
import clsx from "clsx";
import { Link } from "react-router-dom";

import s from "./CustomModal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backdropFilter: "blur(100px)",
    boxShadow: "0 4px 60px 0 rgba(0, 0, 0, 0.25)",
    background: "rgba(255, 255, 255, 0.1)",
    border: "none",
    borderRadius: "8px",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(34, 13, 91, 0.23)",
    backdropFilter: "blur(7px)",
  },
};

Modal.setAppElement("#root");

type Props = {
  isOpen: boolean;
  onClose: () => void;
  headerText?: string;
  onSubmit: () => object;
  type: "login" | "register" | "add" | "edit" | "logout";
  firstBtnText: string;
  secondBtnText: string;
  children: React.ReactNode;
};

const CustomModal = ({
  isOpen,
  onClose,
  headerText,
  onSubmit,
  type,
  firstBtnText,
  secondBtnText,
  children,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div
        className={clsx(
          s.bgModal,
          "w-[100vw] py-[20px] px-[20px] h-screen flex justify-center items-center overflow-hidden md:flex-row md:flex-wrap md:max-w-[533px] md:h-auto md:py-[40px] md:px-[73px]"
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-[15px] right-[15px] text-black"
        >
          X
        </button>

        {headerText && (
          <h2 className="text-[var(--white-color)] text-[24px] text-center w-[100%] mb-[40px] md:text-[30px]">
            {headerText}
          </h2>
        )}

        <form onSubmit={onSubmit} className="w-[100%]">
          <div className={clsx(s.childrenWrapper, "relative overflow-y-auto")}>
            {children}
          </div>

          <div className="w-[100%] mt-[40px] static">
            <button
              type="submit"
              className={clsx(
                s.btnConfirm,
                "block mx-auto w-[100%] uppercase text-[18px] tracking-[0.1em] rounded-[20px] py-[13px] px-[20px] mb-[20px] md:w-[300px]"
              )}
            >
              {firstBtnText}
            </button>

            {type === "login" && (
              <Link
                to="/register"
                className="block mx-auto w-[100%] uppercase text-center text-[18px] tracking-[0.1em] rounded-[20px] py-[13px] px-[20px] mb-[20px] bg-[var(--white-color)] text-[var(--text-button-color)] md:w-[300px]"
              >
                {secondBtnText}
              </Link>
            )}

            {type === "register" && (
              <Link
                to="/login"
                className="block mx-auto w-[100%] uppercase text-center text-[18px] tracking-[0.1em] rounded-[20px] py-[13px] px-[20px] mb-[20px] bg-[var(--white-color)] text-[var(--text-button-color)] md:w-[300px]"
              >
                {secondBtnText}
              </Link>
            )}

            {type === "add" || type === "edit" || type === "logout" ? (
              <button
                onClick={onClose}
                className="block mx-auto w-[100%] uppercase text-[18px] tracking-[0.1em] rounded-[20px] py-[13px] px-[20px] mb-[20px] bg-[var(--white-color)] text-[var(--text-button-color)] md:w-[300px]"
              >
                {secondBtnText}
              </button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CustomModal;
