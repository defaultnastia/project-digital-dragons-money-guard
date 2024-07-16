import { CustomButton } from "../CustomButton/CustomButton";
import CustomModal from "../CustomModal/CustomModal";
import { Controller, useForm } from "react-hook-form";
import { TransactionType, UserTransaction } from "../../redux/data.types";
import DatePicker from "react-datepicker";
import { useState } from "react";
// import { useAppDispatch } from "../../redux/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type EditModalPropsType = {
  UserTransaction?: UserTransaction;
  openModal: boolean;
  closeModal: () => void;
  type: TransactionType; // Temporary
};

const schema = yup.object().shape({
  category: yup
    .string()
    .min(1, "Have to be at list 1 symbol")
    .required("required field"),
  datePicker: yup
    .date()
    .required("Please select a date")
    .min(new Date("2020-01-01"), "Date cannot be before 2020"),
  amount: yup
    .number()
    .min(1, "Have to be at list 1 symbol")
    .required("required field"),
});

export const ModalEditTransaction = ({
  //   UserTransaction: { transactionDate, comment, amount },
  openModal,
  closeModal,
  type,
}: EditModalPropsType) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      //   numberInput: "",
      datePicker: new Date(),
      //   commentInput: "",
    },
  });
  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = (obj: object): void => {
    console.log(obj);

    console.log("The form has been submitted");
  };

  return (
    <CustomModal isOpen={openModal} onClose={closeModal} type="transaction">
      <h2 className="block text-[30px] text-center mb-[40px]">
        Edit transaction
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[100%]">
        <div>
          <span>Income</span> / <span>Expense</span>
        </div>
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
          <div className="w-full relative">
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
            <Controller
              name="datePicker"
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
              <use href="../../images/icons.svg#icon-ate_range"></use>
            </svg>
            {errors.datePicker && (
              <p className="text-red-500 text-sm mt-1">
                {errors.datePicker.message}
              </p>
            )}
          </div>

          <input
            type="text"
            className="w-[100%] p-[8px] text-[var(--white-color)] bg-[transparent] border-solid border-b-[1px] border-[var(--white-40-color)]"
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
    </CustomModal>
  );
};
