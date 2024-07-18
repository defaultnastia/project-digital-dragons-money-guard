/* How To Use

Button type
<CustomButton elementLike={ {btnType: "submit" or "button", onClick={AnyHandleClickFunction} *not require type} *Object } btnStyle="colorful" or "mono"> Any Text *(require type) </CustomButton>

Link type
<CustomButton elementLike={ {linkTo: "your link"} *Object } btnStyle="colorful" or "mono"> Any Text *(require type) </CustomButton>

*/
import { Link } from "react-router-dom";
import style from "./CustomButton.module.css";

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
