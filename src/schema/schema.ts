import * as yup from "yup";

const emailSchema = yup
  .string()
  .email("Введіть коректний email")
  .required("Email є обов'язковим полем");

const passwordSchema = yup
  .string()
  .required("Пароль є обов'язковим полем")
  .min(6, "Пароль повинен містити щонайменше 6 символів")
  .max(12, "Пароль повинен містити не більше 12 символів");

export const loginFormSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const registerFormSchema = yup.object().shape({
  username: yup
    .string()
    .required("Імя є обов'язковим полем")
    .min(3, "Імя занадто коротке"),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Паролі повинні співпадати")
    .required("Підтвердження пароля є обов'язковим полем"),
});
