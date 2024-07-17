import React from "react";
import Modal from "react-modal";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

import s from "./CustomModal.module.css";
import { Icon } from "../Icon/Icon";

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
  type: "transaction" | "auth";
  children: React.ReactNode;
};

const CustomModal = ({ isOpen, onClose, type, children }: Props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  if (isMobile) {
    customStyles.content.borderRadius = "0";
  } else {
    customStyles.content.borderRadius = "8px";
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={clsx(s.bgModal)}>
        {!isMobile && type === "transaction" && (
          <button onClick={onClose} className={clsx(s.btnClose)}>
            <Icon
              name="close"
              size={16}
              className="hover:stroke-[var(--dashboard-text-color)]"
              stroke="var(--white-color)"
            />
          </button>
        )}

        <div className={clsx(s.childrenWrapper, "relative w-[100%]")}>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
