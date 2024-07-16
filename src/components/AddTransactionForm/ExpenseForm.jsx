import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDropdownIndicator from "./CustomDropdownIndicator";
import { CustomButton } from "../CustomButton/CustomButton";

const schema = yup.object().shape({
  selectOption: yup.string().required("Please select a category"),
  datePicker: yup.date(),
  numberInput: yup
    .number()
    .typeError("Please enter a number")
    .required("Please enter a number"),
  commentInput: yup.string().trim().required("Please enter a comment"),
});

const ExpenseForm = ({ closeModal }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      selectOption: "",
      numberInput: "",
      datePicker: new Date(),
      commentInput: "",
    },
  });

  const onSubmit = (data) => {
    if (!data.datePicker) {
      data.datePicker = new Date();
    }
    console.log(data);

    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[40px] w-full mt-[40px]"
    >
      <div>
        <Controller
          name="selectOption"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              value={
                field.value ? { value: field.value, label: field.value } : null
              }
              options={[
                { value: "Main expenses", label: "Main expenses" },
                { value: "Products", label: "Products" },
                { value: "Car", label: "Car" },
                { value: "Self care", label: "Self care" },
                { value: "Child care", label: "Child care" },
                { value: "Household products", label: "Household products" },
                { value: "Education", label: "Education" },
                { value: "Leisure", label: "Leisure" },
              ]}
              placeholder="Select a category"
              className="w-full border-b border-gray-300 border-opacity-60 focus:border-opacity-100"
              onChange={(selectedOption) =>
                field.onChange(selectedOption.value)
              }
              onBlur={field.onBlur}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: CustomDropdownIndicator,
              }}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  background: "none",
                  border: "none",
                  color: "white",
                  boxShadow: state.isFocused ? "none" : provided.boxShadow,
                  "&:hover": {
                    borderColor: "none",
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                  borderRadius: "8px",
                  background:
                    "var(--Small-Form-color, linear-gradient(0deg, rgba(83, 61, 186, 0.70) 0%, rgba(80, 48, 154, 0.70) 43.14%, rgba(106, 70, 165, 0.52) 73.27%, rgba(133, 93, 175, 0.13) 120.03%))",
                  boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.25)",
                  backdropFilter: "blur(50px)",
                }),
                option: (provided, state) => ({
                  ...provided,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                  color: "white",
                  backgroundColor: state.isSelected
                    ? "rgba(255, 255, 255, 0.2)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.10)",
                    color: "#FF868D",
                  },
                  paddingLeft: "20px",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "var(--white-60, rgba(255, 255, 255, 0.60))",
                  fontFamily: "Poppins",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                  paddingLeft: "10px",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                  paddingLeft: "10px",
                  fontFamily: "Poppins",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                }),
              }}
            />
          )}
        />
        {errors.selectOption && (
          <p className="text-red-500 text-sm mt-1">
            {errors.selectOption.message}
          </p>
        )}
      </div>
      <div>
        <Controller
          name="numberInput"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="0.00"
              className="w-full p-2 pl-[20px] pb-[8px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100"
            />
          )}
        />
        {errors.numberInput && (
          <p className="text-red-500 text-sm mt-1">
            {errors.numberInput.message}
          </p>
        )}
      </div>
      <div className="w-full relative">
        <Controller
          name="datePicker"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value ? field.value : new Date()}
              onChange={(date) => field.onChange(date)}
              dateFormat="dd.MM.yyyy"
              className=" w-full p-2 pl-[20px] pb-[8px] border-b border-gray-300 border-opacity-60 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none font-poppins text-base font-normal leading-normal focus:border-opacity-100"
              wrapperClassName="w-full"
            />
          )}
        />
        {errors.datePicker && (
          <p className="text-red-500 text-sm mt-1">
            {errors.datePicker.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="commentInput"
          className="text-white text-lg pl-[20px] text-opacity-60"
        >
          Comment
        </label>
        <Controller
          name="commentInput"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="commentInput"
              type="text"
              className="w-full p-2 pl-[20px] pb-[8px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100"
            />
          )}
        />
        {errors.commentInput && (
          <p className="text-red-500 text-sm mt-1">
            {errors.commentInput.message}
          </p>
        )}
      </div>

      <div>
        <CustomButton elementLike={{ btnType: "submit" }} btnStyle="colorful">
          Add
        </CustomButton>

        <CustomButton
          elementLike={{ btnType: "button", onClick: closeModal }}
          btnStyle="mono"
        >
          Cancel
        </CustomButton>
      </div>
    </form>
  );
};

export default ExpenseForm;
