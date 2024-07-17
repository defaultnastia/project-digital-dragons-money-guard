import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";
import CustomDropdownIndicator from "./CustomDropdownIndicator";
import { CustomButton } from "../CustomButton/CustomButton";
import { addTransaction } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/transactions/selectors";
import sprite from "../../img/icons.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserTransaction, TransactionType } from "../../redux/data.types";
import { getBalance } from "../../redux/user/operations";

interface ExpenseFormProps {
  closeModal: () => void;
}

interface Option {
  value: string;
  label: string;
}

interface FormInput {
  categoryId: string;
  amount: number;
  transactionDate: Date;
  comment: string;
}

const schema = yup.object().shape({
  categoryId: yup.string().required("Please select a category"),
  transactionDate: yup
    .date()
    .required("Please select a date")
    .min(new Date("2020-01-01"), "Date cannot be before 2020"),
  amount: yup
    .number()
    .typeError("Please enter a number")
    .required("Please enter a number")
    .max(1000000, "Amount cannot exceed 1,000,000"),
  comment: yup
    .string()
    .trim()
    .required("Please enter a comment")
    .max(30, "Comment cannot exceed 30 symbols"),
});

const ExpenseForm: React.FC<ExpenseFormProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [options, setOptions] = useState<Option[]>([]);
  const datePickerRef = useRef<DatePicker | null>(null);

  useEffect(() => {
    if (categories) {
      setOptions(
        categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      );
    }
  }, [categories]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryId: "",
      transactionDate: new Date(),
      comment: "",
      amount: 0,
    },
  });

  const onSubmit = async (data: Omit<UserTransaction, "type">) => {
    const formattedData = {
      transactionDate: data.transactionDate,
      type: "EXPENSE" as TransactionType,
      categoryId: data.categoryId,
      comment: data.comment,
      amount: data.amount > 0 ? -data.amount : data.amount,
    };

    try {
      await dispatch(addTransaction(formattedData));
      await dispatch(getBalance());
      closeModal();
    } catch (error) {
      toast.error("Failed to add transaction. Please try again");
    }
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
                    "&:hover": {
                      borderColor: "none",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                    borderRadius: "8px",
                    backgroundColor:
                      "linear-gradient(0deg, rgba(83, 61, 186, 0.70) 0%, rgba(80, 48, 154, 0.70) 43.14%, rgba(106, 70, 165, 0.52) 73.27%, rgba(133, 93, 175, 0.13) 120.03%);",
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
                    "@media (min-width: 768px)": {
                      paddingLeft: "0px",
                    },
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "white",
                    paddingLeft: "10px",
                    "@media (min-width: 768px)": {
                      paddingLeft: "0px",
                    },
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
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[40px] md:flex-row md:gap-[25px] md:justify-center md:flex-wrap w-full">
          <div className="w-full md:w-[181px]">
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="amount"
                  value={field.value === 0 ? "" : field.value}
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
                  selected={field.value ? field.value : new Date()}
                  id="transactionDate"
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd.MM.yyyy"
                  className="w-full pl-[20px] pb-[8px] md:pl-[21px] border-b border-gray-300 border-opacity-60 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100"
                  wrapperClassName="w-full"
                  placeholderText="Select a date"
                  calendarStartDay={1}
                  maxDate={new Date()}
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
                placeholder="Comment"
                className="w-full pl-[20px] pb-[8px] md:pl-[9px] md:pb-[52px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100 "
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

export default ExpenseForm;
