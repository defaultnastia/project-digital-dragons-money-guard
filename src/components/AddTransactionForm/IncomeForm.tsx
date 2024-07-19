import React from "react";
import CommonForm from "./CommonForm";
import { incomeSchema } from "./schemas";
import { BaseFormInput } from "./types";

const IncomeForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const defaultValues: BaseFormInput = {
    transactionDate: new Date(),
    comment: "",
    amount: null,
  };

  return (
    <CommonForm
      closeModal={closeModal}
      type="INCOME"
      schema={incomeSchema}
      defaultValues={defaultValues}
    />
  );
};

export default IncomeForm;
