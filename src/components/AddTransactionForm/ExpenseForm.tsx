import React from "react";
import CommonForm from "./CommonForm";
import { selectCategories } from "../../redux/transactions/selectors";
import { useAppSelector } from "../../redux/hooks";
import { expenseSchema } from "./schemas";
import { ExpenseFormInput } from "./types";

const ExpenseForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const categories = useAppSelector(selectCategories);
  const options = categories
    ?.filter(
      (category) => category.id !== "063f1132-ba5d-42b4-951d-44011ca46262"
    )
    .map((category) => ({ value: category.id, label: category.name }));

  const defaultValues: ExpenseFormInput = {
    categoryId: "",
    transactionDate: new Date(),
    comment: "",
    amount: undefined,
  };

  return (
    <CommonForm
      closeModal={closeModal}
      type="EXPENSE"
      schema={expenseSchema}
      defaultValues={defaultValues}
      options={options}
    />
  );
};

export default ExpenseForm;
