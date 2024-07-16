import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomButton } from "../CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/transactions/operations";

import sprite from "../../img/icons.svg";

interface IncomeFormProps {
  closeModal: () => void;
}

const schema = yup.object().shape({
  datePicker: yup
    .date()
    .required("Please select a date")
    .min(new Date("2020-01-01"), "Date cannot be before 2020"),
  numberInput: yup
    .number()
    .typeError("Please enter a number")
    .required("Please enter a number"),
  commentInput: yup.string().trim().required("Please enter a comment"),
});

const IncomeForm: React.FC<IncomeFormProps> = ({ closeModal }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      numberInput: "",
      datePicker: new Date(),
      commentInput: "",
    },
  });

  const onSubmit = async (data: any) => {
    const formattedData = {
      transactionDate: data.datePicker,
      type: "INCOME",
      categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
      comment: data.commentInput,
      amount: parseFloat(data.numberInput),
    };

    try {
      await dispatch(addTransaction(formattedData));
      closeModal();
    } catch (error) {
      // toast.error("Error adding transaction. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[40px] w-full mt-[40px]"
    >
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
            />
          )}
        />
        {errors.numberInput && (
          <p className="text-red-500 text-sm mt-1">
            {errors.numberInput.message}
          </p>
        )}
      </div>

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
              className="w-full p-2 pl-[20px] pb-[8px] border-b border-gray-300 bg-transparent border-opacity-60 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-opacity-100"
            />
          )}
        />
        {errors.commentInput && (
          <p className="text-red-500 text-sm mt-1">
            {errors.commentInput.message}
          </p>
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
