import { useState } from "react";
import SwitcherComponent from "./SwitcherComponent";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomDropdownIndicator from "./CustomDropdownIndicator";
import * as yup from "yup";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const schema = yup.object().shape({
  // selectOption: yup.string().required("Please select an option"),
  datePicker: yup.date(),
  numberInput: yup
    .number()
    .typeError("Please enter a number")
    .required("Please enter a number"),
  commentInput: yup.string().trim().required("Please enter a comment"),
});

export const AddTransactionForm = ({ closeModal }) => {
  const [isChecked, setIsChecked] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const onSubmit = (data) => {
    if (!data.datePicker) {
      data.datePicker = new Date();
    }

    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center p-[28px] pr-[20px] pl-[20px]">
      <h2 className="w-280 h-31 text-2xl mb-[32px] text-center">
        Add transaction
      </h2>
      <SwitcherComponent isChecked={isChecked} handleChange={handleChange} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[40px] w-full mt-[40px]"
      >
        {isChecked && (
          <div>
            <Controller
              name="selectOption"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={
                    field.value
                      ? { value: field.value, label: field.value }
                      : null
                  }
                  options={[
                    { value: "Option 1", label: "Option 1" },
                    { value: "Option 2", label: "Option 2" },
                    { value: "Option 3", label: "Option 3" },
                  ]}
                  placeholder="Select a category"
                  className="w-full border-b border-gray-300 border-opacity-60"
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption.value)
                  }
                  onBlur={field.onBlur}
                  components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: CustomDropdownIndicator,
                  }}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      background: "none",
                      border: "none",
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
                      color: "#FBFBFB",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "normal",
                      backgroundColor: state.isSelected ? "lightgray" : null,
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
        )}

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
                value={field.value || ""}
              />
            )}
          />
          {errors.numberInput && (
            <p className="text-red-500 text-sm mt-1">
              {errors.numberInput.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="datePicker"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value ? field.value : new Date()}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd.MM.yyyy"
                className="w-full p-2 pl-[20px] pb-[8px] border-b border-gray-300 border-opacity-60 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none font-poppins text-base font-normal leading-normal focus:border-opacity-100"
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
                className="w-full pl-[20px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100"
                value={field.value || ""}
              />
            )}
          />
          {errors.commentInput && (
            <p className="text-red-500 text-sm mt-1">
              {errors.commentInput.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="py-2 px-4 mt-6 bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-lg font-medium rounded-full shadow-lg hover:opacity-90 focus:outline-none"
        >
          Add
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="py-2 px-4 mt-2 bg-white text-gray-700 text-lg font-medium rounded-full shadow-lg hover:opacity-90 focus:outline-none"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
