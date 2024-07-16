import sprite from "../../images/icons.svg";

export const CustomDropdownIndicator = () => {
  return (
    <div className="mr-[20px] ">
      <svg width="18" height="9">
        <use xlinkHref={`${sprite}#icon-ate_range`}></use>
      </svg>
    </div>
  );
};

export default CustomDropdownIndicator;
