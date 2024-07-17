import { CustomButton } from "../CustomButton/CustomButton";
import { Controller, useForm } from "react-hook-form";
import { Transaction } from "../../redux/data.types";
import DatePicker from "react-datepicker";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import sprite from "../../img/icons.svg";
import { useAppDispatch } from "../../redux/hooks";
import { updateTransaction } from "../../redux/transactions/operations";
import toast from "react-hot-toast";

type EditFormPropsType = {
  userTransaction: Transaction;
  closeModal: () => void;
};

const schema = yup.object().shape({
  category: yup
    .string()
    .min(1, "Have to be at list 1 symbol")
    .required("required field"),
  transactionDate: yup
    .date()
    .required("Please select a date")
    .min(new Date("2020-01-01"), "Date cannot be before 2020"),
  amount: yup.number().required("required field"),
  comment: yup.string(),
});

export const EditTransactionForm = ({
  userTransaction: { id, amount, transactionDate, comment, type, categoryId },
  closeModal,
}: EditFormPropsType) => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: "car",
      amount: amount,
      transactionDate: new Date(transactionDate),
      comment: comment,
    },
  });

  const onSubmit = (data: Omit<Transaction, "id">): void => {
    const updTransaction = {
      transactionDate: data.transactionDate,
      comment: data.comment,
      amount: data.amount,
      categoryId,
      type,
    };

    try {
      dispatch(updateTransaction({ updTransaction, transId: id }));
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
        <div className="">
          {type === "EXPENSE" && (
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="w-[100%] p-[8px] mb-[40px] text-[var(--white-color)] bg-[transparent] border-solid border-b-[1px] border-[var(--white-40-color)]"
                />
              )}
            />
          )}
          <div className="md:flex row gap-[32px]">
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="mb:w-[181px] w-full p-2 s:pl-[20px] mb-[40px] text-start md:text-center border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100"
                />
              )}
            />
            <div className=" w-full relative">
              <Controller
                name="transactionDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? field.value : new Date()}
                    onChange={(date) => field.onChange(date)}
                    id="transactionDate"
                    dateFormat="dd.MM.yyyy"
                    className="md:w-[181px] w-full p-2 pl-[20px] pb-[8px] mb-[40px] border-b border-gray-300 border-opacity-60 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none font-poppins text-base font-normal leading-normal focus:border-opacity-100"
                    wrapperClassName="w-full"
                    maxDate={new Date()}
                  />
                )}
              />
              <svg
                className="w-6 h-6 absolute"
                style={{ top: "8px", right: "17px", fill: "#734AEF" }}
                width="24"
                height="24"
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

          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full p-2 pl-[20px] pb-[8px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100"
              />
            )}
          />
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