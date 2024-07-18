import React from "react";

import s from "./CustomAuthModal.module.css";

type Props = {
  children: React.ReactNode;
};

const CustomAuthModal = ({ children }: Props) => {
  return (
    <div className={s.bgAuthModal}>
      <div className={s.authModal}>{children}</div>
    </div>
  );
};

export default CustomAuthModal;
