import { useState } from "react";
import SwitcherComponent from "./SwitcherComponent";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";

const AddTransactionForm = ({ closeModal }) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <h2 className="w-280 h-31 text-2xl mb-[32px] text-center">
        Add transaction
      </h2>
      <SwitcherComponent isChecked={isChecked} handleChange={handleChange} />
      {isChecked ? (
        <ExpenseForm closeModal={closeModal} />
      ) : (
        <IncomeForm closeModal={closeModal} />
      )}
    </>
  );
};

export default AddTransactionForm;
