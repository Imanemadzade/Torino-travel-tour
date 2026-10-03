import * as yup from "yup";

export const checkoutFormSchema = yup
  .object({
    fullName: yup.string().required("نام کامل خود را وارد کنید"),
    gender: yup.string().required("انتخاب جنسیت الزامی است"),
    nationalCode: yup
      .string()
      .required("کد ملی خود را وارد کنید .")
      .length(10, "طول کد ملی باید ۱۰ رقم باشد"),
    birthDate: yup.date().required("تاریخ تولد خود را وارد کنید . "),
  })
  .required();
