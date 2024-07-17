import { useState } from "react";
import SwitcherComponent from "./SwitcherComponent";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";

interface AddTransactionFormProps {
  closeModal: () => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  closeModal,
}) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <h2 className="mb-[32px] text-center text-[24px] md:text-[30px]">
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
