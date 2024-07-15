import { Link } from "react-router-dom";

type CustomButtonPropsType = {
  customBtn: {
    btnStyle: string;
    btnText: string;
  };
  onClick?: () => void;
};

export const CustomButton = ({
  customBtn: { btnStyle, btnText },
  onClick,
}: CustomButtonPropsType) => {
  switch (btnStyle) {
    case "colorful":
      return (
        <button
          type="submit"
          className="block mx-auto w-[100%] uppercase text-[18px] tracking-[0.1em] rounded-[20px] py-[13px] px-[20px] mb-[20px] md:w-[300px] bg-gradient-to-r from-[#FFC727] from-0% via-[#9E40BA] via-[61%] to-[#7000FF] to-[91%] drop-shadow-xl"
        >
          {btnText}
        </button>
      );
    case "mono":
      return btnText === "login" || btnText === "register" ? (
        <Link
          to={btnText}
          className="block mx-auto w-[100%] uppercase text-center text-[18px] tracking-[0.1em] rounded-[20px] py-[13px] px-[20px] mb-[20px] bg-[var(--white-color)] text-[var(--text-button-color)] md:w-[300px]"
        >
          {btnText === "login" ? "log in" : btnText}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="block mx-auto w-[100%] uppercase text-center text-[18px] tracking-[0.1em] rounded-[20px] py-[13px] px-[20px] mb-[20px] bg-[var(--white-color)] text-[var(--text-button-color)] md:w-[300px]"
        >
          {btnText}
        </button>
      );

    default:
      return;
  }
};
