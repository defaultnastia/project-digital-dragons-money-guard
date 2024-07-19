import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";
import CustomDropdownIndicator from "./CustomDropdownIndicator";
import { CustomButton } from "../CustomButton/CustomButton";
import {
  addTransaction,
  getAllTransactions,
} from "../../redux/transactions/operations";
import sprite from "../../img/icons.svg";
import { useAppDispatch } from "../../redux/hooks";
import { UserTransaction } from "../../redux/data.types";
import { getBalance } from "../../redux/user/operations";
import { unwrapResult } from "@reduxjs/toolkit";
import { BaseFormInput, ExpenseFormInput, CommonFormProps } from "./types";

const CommonForm: React.FC<CommonFormProps> = ({
  closeModal,
  type,
  schema,
  defaultValues,
  options,
}) => {
  const dispatch = useAppDispatch();
  const datePickerRef = useRef<DatePicker | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BaseFormInput | ExpenseFormInput>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: BaseFormInput | ExpenseFormInput) => {
    const formattedData: UserTransaction = {
      ...data,
      type,
      amount:
        data.amount !== null
          ? type === "EXPENSE" && data.amount > 0
            ? -data.amount
            : data.amount
          : 0,
      categoryId:
        type === "INCOME"
          ? "063f1132-ba5d-42b4-951d-44011ca46262"
          : (data as ExpenseFormInput).categoryId,
    };

    const resultAction = await dispatch(addTransaction(formattedData));
    unwrapResult(resultAction);

    await dispatch(getBalance());
    await dispatch(getAllTransactions());
    toast.success("Successfully added transaction");
    closeModal();
  };

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[40px] w-full mt-[40px]"
    >
      <div className="flex flex-col gap-[40px]">
        {type === "EXPENSE" && options && (
          <div>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={
                    field.value
                      ? options.find((option) => option.value === field.value)
                      : null
                  }
                  id="categoryId"
                  options={options}
                  placeholder="Select a category"
                  className="w-full border-b border-gray-300 border-opacity-60 focus:border-opacity-100"
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption?.value)
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
                      cursor: "pointer",
                      boxShadow: state.isFocused ? "none" : provided.boxShadow,
                      "&:hover": { borderColor: "none" },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999,
                      borderRadius: "8px",
                      background:
                        "linear-gradient(0deg, rgba(83, 61, 186, 1) 0%, rgba(80, 48, 154, 1) 43.14%, rgba(106, 70, 165, 1) 73.27%, rgba(133, 93, 175, 1) 120.03%)",
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
                      cursor: "pointer",
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
                      "@media (min-width: 768px)": { paddingLeft: "0px" },
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "white",
                      paddingLeft: "10px",
                      "@media (min-width: 768px)": { paddingLeft: "0px" },
                      fontFamily: "Poppins",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "normal",
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: "white",
                      caretColor: "transparent",
                    }),
                  }}
                />
              )}
            />
            {type === "EXPENSE" && "categoryId" in errors && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId?.message}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-[40px] md:flex-row md:gap-[25px] md:justify-center md:flex-wrap w-full">
          <div className="w-full md:w-[181px]">
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="amount"
                  value={
                    field.value !== undefined && field.value !== null
                      ? field.value
                      : ""
                  }
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-[20px] pb-[8px] md:pl-[0px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100 no-arrows md:text-center"
                />
              )}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="w-full md:w-[181px] relative">
            <Controller
              name="transactionDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value || new Date()}
                  id="transactionDate"
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd.MM.yyyy"
                  className="w-full pl-[20px] pb-[8px] md:pl-[21px] border-b border-gray-300 border-opacity-60 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100"
                  wrapperClassName="w-full"
                  placeholderText="Select a date"
                  calendarStartDay={1}
                  maxDate={new Date()}
                  calendarClassName="react-datepicker"
                  ref={datePickerRef}
                />
              )}
            />
            <svg
              className="absolute sb right-[16px] top-[3px] md:right-[10px] md:top-[1px] cursor-pointer"
              style={{ fill: "#734AEF" }}
              width="24"
              height="24"
              onClick={handleIconClick}
            >
              <use xlinkHref={`${sprite}#icon-ate_range`}></use>
            </svg>
            {errors.transactionDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.transactionDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full">
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="comment"
                type="text"
                value={field.value || ""}
                placeholder="Comment"
                className="w-full pl-[20px] pb-[52px] md:pl-[9px] md:pb-[8px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100 "
              />
            )}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>
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

export default CommonForm;
