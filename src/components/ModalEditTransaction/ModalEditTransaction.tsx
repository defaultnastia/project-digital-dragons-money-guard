import { CustomButton } from "../CustomButton/CustomButton";
import CustomModal from "../CustomModal/CustomModal";
import { Controller, useForm } from "react-hook-form";
import { TransactionType, UserTransaction } from "../../redux/data.types";
import DatePicker from "react-datepicker";
import { useState } from "react";
// import { useAppDispatch } from "../../redux/hooks";

type EditModalPropsType = {
  UserTransaction?: UserTransaction;
  openModal: boolean;
  closeModal: () => void;
  type: TransactionType; // Temporary
};

export const ModalEditTransaction = ({
  //   UserTransaction,
  openModal,
  closeModal,
  type,
}: EditModalPropsType) => {
  const { control, handleSubmit } = useForm();
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
        <div className="overflow-y-auto">
          {type === "EXPENSE" && (
            <input
              type="text"
              className="w-[100%] p-[8px] text-[var(--white-color)] placeholder:text-[var(--white-60-color)] bg-[transparent] border-solid border-b-[1px] border-[var(--white-40-color)]"
            ></input>
          )}
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
            <svg
              className="w-6 h-6 absolute"
              style={{ top: "8px", right: "17px", fill: "#734AEF" }}
              width="24"
              height="24"
            >
              <use href="../../images/icons.svg#icon-ate_range"></use>
            </svg>
            {/* {errors.datePicker && (
              <p className="text-red-500 text-sm mt-1">
                {errors.datePicker.message}
              </p>
            )} */}
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
