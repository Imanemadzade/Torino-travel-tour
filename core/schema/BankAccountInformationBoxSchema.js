import * as yup from "yup";
const numberRegex = /^\d+$/;

export const BankAccountInformationBoxSchema = yup
  .object({
    debitCardCode: yup
      .string()
      .matches(numberRegex, {
        message: "شماره کارت باید فقط شامل اعداد باشد.",
        excludeEmptyString: true,
      })
      .test(
        "debit-card-code",
        "شماره کارت باید ۱۶ رقم باشد.",
        (value) => !value || value.length === 16
      ),

    shabaCode: yup
      .string()
      .matches(numberRegex, {
        message: "شماره شبا باید فقط شامل اعداد باشد.",
        excludeEmptyString: true,
      })
      .test(
        "shaba-code",
        "شماره شبا باید ۲۴ رقم باشد.",
        (value) => !value || value.length === 24
      ),

    accountIdentifier: yup.string().matches(numberRegex, {
      message: "شماره حساب باید فقط شامل اعداد باشد.",
      excludeEmptyString: true,
    }),
  })
  .required();
