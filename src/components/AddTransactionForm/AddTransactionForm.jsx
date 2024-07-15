import { useState } from "react";
import SwitcherComponent from "./SwitcherComponent";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const schema = yup.object().shape({
  selectOption: yup.string().required("Please select an option"),
  datePicker: yup.date().required("Please select a date"),
  numberInput: yup
    .number()
    .typeError("Please enter a number")
    .required("Please enter a number"),
  comment: yup.string().trim().required("Please enter a comment"),
});

export const AddTransactionForm = ({ closeModal }) => {
  const [isChecked, setIsChecked] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center align-center flex-col text-center gap-4">
      <h2 className="text-2xl font-normal">Add transaction</h2>
      <SwitcherComponent isChecked={isChecked} handleChange={handleChange} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center gap-4 flex-col"
      >
        {isChecked && (
          <div>
            <Controller
              name="selectOption"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "option1", label: "Option 1" },
                    { value: "option2", label: "Option 2" },
                    { value: "option3", label: "Option 3" },
                  ]}
                  placeholder="Select a category"
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption.value)
                  }
                  onBlur={field.onBlur}
                />
              )}
            />
            {errors.selectOption && (
              <p className="text-red-500">{errors.selectOption.message}</p>
            )}
          </div>
        )}

        <div>
          <Controller
            name="numberInput"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="0.00"
                value={field.value || ""}
              />
            )}
          />
          {errors.numberInput && (
            <p className="text-red-500">{errors.numberInput.message}</p>
          )}
        </div>

        <div>
          <Controller
            name="datePicker"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value || new Date()}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
              />
            )}
          />
          {errors.datePicker && (
            <p className="text-red-500">{errors.datePicker.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="comment">Comment</label>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="comment"
                type="text"
                value={field.value || ""}
              />
            )}
          />
          {errors.comment && (
            <p className="text-red-500">{errors.comment.message}</p>
          )}
        </div>

        <button type="submit">Add</button>
        <button type="button" onClick={() => closeModal()}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
