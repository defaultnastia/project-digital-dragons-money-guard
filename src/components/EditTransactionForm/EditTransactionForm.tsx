import { CustomButton } from "../CustomButton/CustomButton";
import { Controller, useForm } from "react-hook-form";
import { Transaction } from "../../redux/data.types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import sprite from "../../img/icons.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getAllTransactions,
  updateTransaction,
} from "../../redux/transactions/operations";
import toast from "react-hot-toast";
import { getBalance } from "../../redux/user/operations";

import "../AddTransactionForm/datepicker-custom.css";
import { useRef } from "react";
import { selectCategories } from "../../redux/transactions/selectors";
import { getTransactionCategory } from "../../helpers/getTransactionCategory";

type EditFormPropsType = {
  userTransaction: Transaction;
  closeModal: () => void;
};

type formElementsType = {
  transactionDate: Date;
  comment: string;
  amount: number;
};

const schema = yup.object().shape({
  category: yup.string().min(1, "Have to be at list 1 symbol"),
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
    .min(1, "leave a comment")
    .required("Please leave a comment"),
});

export const EditTransactionForm = ({
  userTransaction: { id, amount, transactionDate, comment, type, categoryId },
  closeModal,
}: EditFormPropsType) => {
  const dispatch = useAppDispatch();
  const datePickerRef = useRef<DatePicker | null>(null);
  const categories = useAppSelector(selectCategories);

  const category = getTransactionCategory(categories, categoryId);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: category?.name,
      amount: amount < 0 ? -amount : amount,
      transactionDate: new Date(transactionDate),
      comment,
    },
  });

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  const onSubmit = (data: formElementsType): void => {
    const updTransaction = {
      transactionDate: data.transactionDate,
      comment: data.comment,
      amount: type === "EXPENSE" ? -data.amount : data.amount,
      categoryId,
      type,
    };

    try {
      dispatch(updateTransaction({ updTransaction, transId: id as string }))
        .unwrap()
        .then(() => {
          dispatch(getAllTransactions());
          dispatch(getBalance());
          toast.success("Transaction was successfully updated");
        });
      closeModal();
    } catch (error) {
      toast.error("Failed to update transaction. Please try again");
    }
  };

  return (
    <div>
      <h2 className="block text-[30px] text-center mb-[40px]">
        Edit transaction
      </h2>
      <div className="flex justify-center gap-5 mb-[60px]">
        <span className={type === "INCOME" ? "text-[#ff868d]" : "text-white"}>
          Income
        </span>
        /
        <span className={type === "EXPENSE" ? "text-[#ff868d]" : "text-white"}>
          Expense
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[100%]">
        <div className="flex flex-col gap-[40px] w-full mt-[40px]">
          {type === "EXPENSE" && (
            <Controller
              name="category"
              control={control}
              disabled
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="w-[100%] p-[8px] pl-[20px] md:pl-[8px] text-[var(--white-color)] bg-[transparent] border-solid border-b-[1px] border-[var(--white-40-color)]"
                />
              )}
            />
          )}
          <div className="flex max-[767px]:flex-col max-[767px]:gap-[40px] md:row md:gap-[32px]">
            <div className="w-full">
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    className="mb:w-[181px] w-full md:p-2 pl-[20px] pb-[8px] text-start md:text-center border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100 no-arrows"
                  />
                )}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>
            <div className="w-full relative">
              <Controller
                name="transactionDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? field.value : new Date()}
                    onChange={(date) => field.onChange(date)}
                    id="transactionDate"
                    dateFormat="dd.MM.yyyy"
                    className="md:w-[181px] w-full p-2 pl-[20px] pb-[9px] border-b border-gray-300 border-opacity-60 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none font-poppins text-base font-normal leading-normal focus:border-opacity-100"
                    wrapperClassName="w-full"
                    calendarStartDay={1}
                    maxDate={new Date()}
                    calendarClassName="react-datapicker"
                    ref={datePickerRef}
                  />
                )}
              />
              <svg
                className="absolute sb right-[16px] top-[3px] md:right-[10px] md:top-[1px] cursor-pointer"
                style={{ top: "8px", right: "17px", fill: "#734AEF" }}
                width="24"
                height="24"
                onClick={handleIconClick}
              >
                <use href={`${sprite}#icon-ate_range`}></use>
              </svg>
              {errors.transactionDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.transactionDate.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="w-full p-2 pl-[20px] pb-[52px] md:pb-[8px] md:pl-[8px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg  focus:outline-none focus:border-opacity-100 resize-none"
                  placeholder="Comment"
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

        <div className="w-[100%] mt-[40px]">
          <CustomButton elementLike={{ btnType: "submit" }} btnStyle="colorful">
            Save
          </CustomButton>
          <CustomButton
            elementLike={{ btnType: "button", onClick: closeModal }}
            btnStyle="mono"
          >
            Cancel
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
