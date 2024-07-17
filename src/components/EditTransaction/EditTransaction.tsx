import { CustomButton } from "../CustomButton/CustomButton";
import CustomModal from "../CustomModal/CustomModal";
import { Controller, useForm } from "react-hook-form";
import {
  PatchData,
  Transaction,
  UserTransaction,
} from "../../redux/data.types";
import DatePicker from "react-datepicker";
// import { useAppDispatch } from "../../redux/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import sprite from "../../img/icons.svg";
import { useAppDispatch } from "../../redux/hooks";
import { updateTransaction } from "../../redux/transactions/operations";

type EditModalPropsType = {
  userTransaction: UserTransaction;
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

export const EditTransaction = ({
  userTransaction: { id, amount, transactionDate, comment, type, categoryId },
  openModal,
  closeModal,
}: EditModalPropsType) => {
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

  const dispatch = useAppDispatch();

  const onSubmit = (data: object): void => {
    const updTransaction: Omit<Transaction, "id"> = {
      type,
      ...data,
      categoryId,
    };
    const transId = id;
    const patchData = { updTransaction, transId };
    dispatch(updateTransaction(patchData));

    const patchData: PatchData = { updTransaction: { ...data, type }, transId };
    console.log(patchData);

    // dispatch(updateTransaction(patchData));
  };

  return (
    <div>
      <h2 className="block text-[30px] text-center mb-[40px]">
        Edit transaction
      </h2>
      <div className="flex justify-center gap-5 mb-10">
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
                  className="w-[100%] p-[8px] text-[var(--white-color)] bg-[transparent] border-solid border-b-[1px] border-[var(--white-40-color)]"
                />
              )}
            />
          )}
          <div className="md:flex row">
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-[100%] p-[8px] text-[var(--white-color)] bg-[transparent] border-solid border-b-[1px] border-[var(--white-40-color)]"
                />
              )}
            />
            <div className="w-full relative">
              <Controller
                name="transactionDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? field.value : new Date()}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd.MM.yyyy"
                    className="w-[100%] p-[8px] text-[var(--white-color)] bg-[transparent] border-solid border-b-[1px] border-[var(--white-40-color)]"
                    wrapperClassName="w-full"
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
                className="w-[100%] p-[8px] text-[var(--white-color)] bg-[transparent] border-solid border-b-[1px] border-[var(--white-40-color)]"
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
