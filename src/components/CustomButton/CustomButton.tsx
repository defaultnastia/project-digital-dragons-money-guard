/* How To Use

Button type
<CustomButton elementLike={ {btnType: "submit" or "button", onClick={AnyHandleClickFunction} *not require type} *Object } btnStyle="colorful" or "mono"> Any Text *(require type) </CustomButton>

Link type
<CustomButton elementLike={ {linkTo: "your link"} *Object } btnStyle="colorful" or "mono"> Any Text *(require type) </CustomButton>

*/
import { Link } from "react-router-dom";

type ButtonLike = {
  btnType: "submit" | "button";
  onClick?: () => void;
};

type LinkLike = {
  linkTo: string;
};

type CustomButtonPropsType = {
  elementLike: ButtonLike | LinkLike;
  btnStyle: "colorful" | "mono";
  children: string;
};

const style = {
  colorful:
    "transition duration-300 ease-in-out block mx-auto w-[100%] uppercase text-center text-[18px] tracking-[0.1em] rounded-[20px] py-[13px] px-[20px] mb-[20px] md:w-[300px] bg-gradient-to-r from-[#ffc727] from-0% via-[#9e40ba] via-61% to-[#7000ff] to-90% hover:bg-gradient-to-r hover:from-[#ffc527de] hover:via-[#9d40bada] hover:to-[#6f00ffd0] focus:bg-gradient-to-r focus:from-[#ffc527de] focus:via-[#9d40bada] focus:to-[#6f00ffd0] drop-shadow-xl",
  mono: "block mx-auto w-[100%] uppercase text-center text-[18px] tracking-[0.1em] rounded-[20px] py-[13px] px-[20px] mb-[20px] bg-[var(--white-color)] hover:bg-gray-300 focus:bg-gray-300 transition duration-300 ease-in-out text-[var(--text-button-color)] md:w-[300px]",
};

export const CustomButton = ({
  elementLike,
  btnStyle,
  children,
}: CustomButtonPropsType) => {
  return "linkTo" in elementLike ? (
    <Link
      to={(elementLike as LinkLike).linkTo}
      className={btnStyle === "colorful" ? style.colorful : style.mono}
    >
      {children}
    </Link>
  ) : (
    <button
      type={(elementLike as ButtonLike).btnType}
      onClick={(elementLike as ButtonLike).onClick}
      className={btnStyle === "colorful" ? style.colorful : style.mono}
    >
      {children}
    </button>
  );
};
