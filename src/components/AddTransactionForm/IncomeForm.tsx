import { useForm, Controller } from "react-hook-form";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";
import toast from "react-hot-toast";
import { CustomButton } from "../CustomButton/CustomButton";
import { useAppDispatch } from "../../redux/hooks";
import {
  addTransaction,
  getAllTransactions,
} from "../../redux/transactions/operations";
import sprite from "../../img/icons.svg";
import { UserTransaction, TransactionType } from "../../redux/data.types";
import { getBalance } from "../../redux/user/operations";

interface IncomeFormProps {
  closeModal: () => void;
}

interface FormInput {
  amount: number;
  transactionDate: Date;
  comment: string;
}

const schema = yup.object().shape({
  transactionDate: yup
    .date()
    .required("Please select a date")
    .min(new Date("2020-01-01"), "Date cannot be before 2020"),
  amount: yup
    .number()
    .typeError("Please enter a number")
    .required("Please enter a number")
    .positive("Income amount should be positive")
    .max(1000000, "Amount cannot exceed 1,000,000"),
  comment: yup
    .string()
    .trim()
    .required("Please enter a comment")
    .max(30, "Comment cannot exceed 30 symbols"),
});

const IncomeForm: React.FC<IncomeFormProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const datePickerRef = useRef<DatePicker | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      transactionDate: new Date(),
      comment: "",
      amount: 0,
    },
  });

  const onSubmit = async (
    data: Omit<UserTransaction, "type" | "categoryId">
  ) => {
    const formattedData = {
      transactionDate: data.transactionDate,
      type: "INCOME" as TransactionType,
      categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
      comment: data.comment,
      amount: data.amount,
    };

    try {
      await dispatch(addTransaction(formattedData));
      await dispatch(getBalance());
      await dispatch(getAllTransactions());
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
      className="flex flex-col gap-[40px] w-full mt-[40px] "
    >
      <div className="flex flex-col gap-[40px]">
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
                  className="w-full pl-[20px] pb-[8px] md:pl-[67px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100 no-arrows"
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
                  selected={field.value}
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
                placeholder="Comment"
                className="w-full pl-[20px] pb-[8px] md:pl-[9px] md:pb-[52px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100"
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

export default IncomeForm;
