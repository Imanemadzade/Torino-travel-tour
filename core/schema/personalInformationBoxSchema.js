import * as yup from "yup";

export const personalInformationBoxSchema = yup
  .object({
    firstName: yup
      .string()
      .test("first-name", "نام باید حداقل ۳ کاراکتر باشد", function (value) {
        if (!value) return true;
        if (value.length < 3) return false;
        return true;
      }),
    lastName: yup
      .string()
      .test(
        "last-name",
        "نام خانوادگی باید حداقل ۳ کاراکتر باشد",
        function (value) {
          if (!value) return true;
          if (value.length < 3) return false;
          return true;
        }
      ),
    gender: yup.string().required("انتخاب جنسیت الزامی است"),
    nationalCode: yup
      .string()
      .test(
        "national-code",
        "کد ملی باید شامل ۱۰ کاراکتر باشد",
        function (value) {
          if (!value) return true;
          if (value.length !== 10) return false;
          return true;
        }
      ),
    birthDate: yup.string(),
  })
  .required();
