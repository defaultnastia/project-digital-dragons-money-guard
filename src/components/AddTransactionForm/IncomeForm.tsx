import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { CustomButton } from "../CustomButton/CustomButton";
import { useAppDispatch } from "../../redux/hooks";
import { addTransaction } from "../../redux/transactions/operations";
import sprite from "../../img/icons.svg";
import { UserTransaction, TransactionType } from "../../redux/data.types";

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
    .positive("Income amount should be positive"),
  comment: yup.string().trim().required("Please enter a comment"),
});

const IncomeForm: React.FC<IncomeFormProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 0,
      transactionDate: new Date(),
      comment: "",
    },
  });

  const onSubmit = (data: Omit<UserTransaction, "type" | "categoryId">) => {
    const formattedData = {
      transactionDate: data.transactionDate,
      type: "INCOME" as TransactionType,
      categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
      comment: data.comment,
      amount: data.amount,
    };

    try {
      dispatch(addTransaction(formattedData));
      closeModal();
    } catch (error) {
      toast.error("Failed to add transaction. Please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[40px] w-full mt-[40px]"
    >
      <div>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="amount"
              value={field.value === 0 ? "" : field.value}
              type="text"
              placeholder="0.00"
              className="w-full p-2 pl-[20px] pb-[8px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100"
            />
          )}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div className="w-full relative">
        <Controller
          name="transactionDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              id="transactionDate"
              onChange={(date) => field.onChange(date)}
              dateFormat="dd.MM.yyyy"
              className=" w-full p-2 pl-[20px] pb-[8px] border-b border-gray-300 border-opacity-60 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none font-poppins text-base font-normal leading-normal focus:border-opacity-100"
              wrapperClassName="w-full"
              placeholderText="Select a date"
            />
          )}
        />
        <svg
          className="w-6 h-6 absolute"
          style={{ top: "8px", right: "17px", fill: "#734AEF" }}
          width="24"
          height="24"
        >
          <use xlinkHref={`${sprite}#icon-ate_range`}></use>
        </svg>
        {errors.transactionDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.transactionDate.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="comment"
          className="text-white text-lg pl-[20px] text-opacity-60"
        >
          Comment
        </label>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="comment"
              type="text"
              className="w-full p-2 pl-[20px] pb-[8px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100"
            />
          )}
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
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

export default IncomeForm;
