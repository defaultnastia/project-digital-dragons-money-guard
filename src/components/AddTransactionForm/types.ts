import { TransactionType } from "../../redux/data.types";
import * as yup from "yup";

export interface BaseFormInput {
  amount: undefined | number;
  transactionDate: Date;
  comment: string;
}

export interface ExpenseFormInput extends BaseFormInput {
  categoryId: string;
}

export type FormInput = BaseFormInput | ExpenseFormInput;

export interface Option {
  value: string;
  label: string;
}

export interface CommonFormProps {
  closeModal: () => void;
  type: TransactionType;
  schema: yup.ObjectSchema<BaseFormInput | ExpenseFormInput>;
  defaultValues: BaseFormInput | ExpenseFormInput;
  options?: Option[];
}
