import * as yup from "yup";

export const UserAccountInformationBoxSchema = yup
  .object({
    email: yup.string().email("ایمیل معتبری وارد نمایید."),
  })
  .required();
