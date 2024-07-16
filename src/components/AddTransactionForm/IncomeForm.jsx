import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const schema = yup.object().shape({
  datePicker: yup.date(),
  numberInput: yup
    .number()
    .typeError("Please enter a number")
    .required("Please enter a number"),
  commentInput: yup.string().trim().required("Please enter a comment"),
});

const IncomeForm = ({ closeModal }) => {
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

  const onSubmit = (data) => {
    if (!data.datePicker) {
      data.datePicker = new Date();
    }
    console.log(data);

    closeModal();
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
            />
          )}
        />
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

      <button
        type="submit"
        className="py-2 px-4 mt-6 bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-lg font-medium rounded-full shadow-lg hover:opacity-90 focus:outline-none"
      >
        Add
      </button>
      <button
        type="button"
        onClick={closeModal}
        className="py-2 px-4 mt-2 bg-white text-gray-700 text-lg font-medium rounded-full shadow-lg hover:opacity-90 focus:outline-none"
      >
        Cancel
      </button>
    </form>
  );
};

export default IncomeForm;
