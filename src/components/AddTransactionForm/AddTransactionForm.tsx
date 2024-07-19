import { useState } from "react";
import SwitcherComponent from "./SwitcherComponent";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import { AddTransactionFormProps } from "./types";

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  closeModal,
}) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="max-h-screen md:max-h-full overflow-y-hidden md:overflow-y-visible">
      <h2 className="mt-[20px] md:mt-[0px] mb-[32px] text-center text-[24px] md:text-[30px]">
        Add transaction
      </h2>
      <SwitcherComponent isChecked={isChecked} handleChange={handleChange} />
      {isChecked ? (
        <ExpenseForm closeModal={closeModal} />
      ) : (
        <IncomeForm closeModal={closeModal} />
      )}
    </div>
  );
};

export default AddTransactionForm;
