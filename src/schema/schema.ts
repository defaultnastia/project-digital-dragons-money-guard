import * as yup from "yup";

const emailSchema = yup
  .string()
  .email("Enter a valid email address")
  .required("Email is a required field");

const passwordSchema = yup
  .string()
  .required("Password is a required field")
  .min(6, "The password must contain at least 6 characters")
  .max(12, "The password should contain no more than 12 characters");

export const loginFormSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const registerFormSchema = yup.object().shape({
  username: yup
    .string()
    .required("Name is a required field")
    .min(3, "The name is too short"),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is a required field"),
});
