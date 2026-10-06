import * as yup from "yup";

const checkOTPSchema = yup.object().shape({
  code: yup
    .string()
    .length(6, "کد باید ۶ رقم باشد.")
    .matches(/^\d+$/, "کد باید فقط شامل اعداد باشد.")
    .required("کد OTP الزامی است."),
});

export { checkOTPSchema };
