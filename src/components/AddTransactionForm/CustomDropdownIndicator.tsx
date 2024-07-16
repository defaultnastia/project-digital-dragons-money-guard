// import sprite from "../../img/icons.svg";

export const CustomDropdownIndicator: React.FC = () => {
  return (
    <div className="mr-[20px] ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="11"
        viewBox="0 0 20 11"
        fill="none"
      >
        <path d="M1 1L10 10L19 1" stroke="#FBFBFB" />
      </svg>
      {/* <svg style={{ top: "8px", right: "17px" }} width="40" height="20">
        <use xlinkHref={`${sprite}#`}></use>
      </svg> */}
    </div>
  );
};

export default CustomDropdownIndicator;
