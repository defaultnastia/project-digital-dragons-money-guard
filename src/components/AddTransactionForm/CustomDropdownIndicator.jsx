import sprite from "../../images/icons.svg";

export const CustomDropdownIndicator = () => {
  return (
    <div className="mr-[20px] ">
      {/* <svg width="18" height="9">
        <use xlinkHref={`${sprite}#icon-arrow_down`}></use>
      </svg> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="11"
        viewBox="0 0 20 11"
        fill="none"
      >
        <path d="M1 1L10 10L19 1" stroke="#FBFBFB" />
      </svg>
    </div>
  );
};

export default CustomDropdownIndicator;
