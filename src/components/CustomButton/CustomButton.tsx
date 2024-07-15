import { Link } from "react-router-dom";

type CustomButtonPropsType = {
  btnStyle: "colorful" | "mono";
  type: "submit" | "button";
  onClick?: () => void;
  children: string;
  linkTo?: string;
};

const style = {
  colorful:
    "block mx-auto w-[100%] uppercase text-[18px] tracking-[0.1em] rounded-[20px] py-[13px] px-[20px] mb-[20px] md:w-[300px] bg-gradient-to-r from-[#FFC727] from-0% via-[#9E40BA] via-[61%] to-[#7000FF] to-[91%] drop-shadow-xl",
  mono: "block mx-auto w-[100%] uppercase text-center text-[18px] tracking-[0.1em] rounded-[20px] py-[13px] px-[20px] mb-[20px] bg-[var(--white-color)] text-[var(--text-button-color)] md:w-[300px]",
};

export const CustomButton = ({
  type,
  linkTo,
  onClick,
  btnStyle,
  children,
}: CustomButtonPropsType) => {
  return linkTo !== undefined ? (
    <Link
      to={linkTo ? linkTo : "/"}
      className={btnStyle === "colorful" ? style.colorful : style.mono}
    >
      {children}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={btnStyle === "colorful" ? style.colorful : style.mono}
    >
      {children}
    </button>
  );
};
