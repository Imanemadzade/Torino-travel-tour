import * as yup from "yup";

const phoneRegex = /^09\d{9}$/;

export const sendOTPSchema = yup
  .object({
    mobile: yup
      .string()
      .required("شماره همراه الزامی است!")
      .matches(phoneRegex, "شماره موبایل وارد شده نامعتبر است."),
  })
  .required();
