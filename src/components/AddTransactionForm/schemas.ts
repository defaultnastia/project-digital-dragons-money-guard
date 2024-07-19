import * as yup from "yup";
import { BaseFormInput, ExpenseFormInput } from "./types";

const incomeSchema: yup.ObjectSchema<BaseFormInput> = yup.object().shape({
  transactionDate: yup
    .date()
    .required("Please select a date")
    .min(new Date("2020-01-01"), "Date cannot be before 2020"),
  amount: yup
    .number()
    .typeError("Please enter a number")
    .required("Please enter a number")
    .positive("Income amount should be positive")
    .max(1000000, "Amount cannot exceed 1,000,000")
    .test(
      "decimal-places",
      "Amount cannot have more than 2 decimal places",
      (value) => {
        if (value !== undefined && value !== null) {
          const decimalPart = value.toString().split(".")[1];
          return !decimalPart || decimalPart.length <= 2;
        }
        return true;
      }
    ),
  comment: yup
    .string()
    .trim()
    .required("Please enter a comment")
    .max(30, "Comment cannot exceed 30 symbols"),
});

const expenseSchema: yup.ObjectSchema<ExpenseFormInput> = yup.object().shape({
  categoryId: yup.string().required("Please select a category"),
  transactionDate: yup
    .date()
    .required("Please select a date")
    .min(new Date("2020-01-01"), "Date cannot be before 2020"),
  amount: yup
    .number()
    .typeError("Please enter a number")
    .required("Please enter a number")
    .max(1000000, "Amount cannot exceed 1,000,000")
    .test(
      "decimal-places",
      "Amount cannot have more than 2 decimal places",
      (value) => {
        if (value !== undefined && value !== null) {
          const decimalPart = value.toString().split(".")[1];
          return !decimalPart || decimalPart.length <= 2;
        }
        return true;
      }
    ),
  comment: yup
    .string()
    .trim()
    .required("Please enter a comment")
    .max(30, "Comment cannot exceed 30 symbols"),
});

export { incomeSchema, expenseSchema };
