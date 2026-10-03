import Image from "next/image";

import { otpValidationSchema } from "core/schema/checkOTPSchema";
import { Form, Formik } from "formik";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { ErrorMessage } from "formik";
import { e2p } from "core/utils/replaceNumber";
import { useCheckOTP } from "service/mutations";
import { toast } from "react-toastify";

function CheckOTPForm({ mobile, setIsOpenModal, setStep }) {
  const [otp, setOtp] = useState("");

  const { mutate, isPending } = useCheckOTP();

  const handleSubmit = () => {
    if (isPending) return;

    mutate(
      {
        mobile,
        code: otp,
      },
      {
        onSuccess: () => {
          setIsOpenModal(false);
          setStep(1);
          toast.success("ورود شما با موفقیت انجام شد");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <Formik
      initialValues={{ otp }}
      validationSchema={otpValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, errors, touched, isSubmitting }) => (
        <div className="relative bg-white w-89.5 h-90.5 px-10  rounded-[20px]  shadow-[0_4px_4px_#00000025] md:w-140.25 md:h-90.5 ">
          <Form className="flex flex-col pt-14.75">
            <span
              className="size-6 absolute top-4 left-4 cursor-pointer "
              onClick={() => setIsOpenModal(false)}
            >
              <Image
                width={300}
                height={300}
                src="/svg/arrow-left.svg"
                alt="Back arrow"
              />
            </span>
            <h2 className="text-[22px] text-[#282828] text-center font-semibold mb-4.25 md:text-[28px] md:mb-9">
              کد تایید را وارد کنید.
            </h2>

            <label
              htmlFor="otp-input0"
              className="text-base font-light text-right mb-5.25  "
            >
              کد تایید به شماره {e2p(mobile)} ارسال شد
            </label>

            <div className="flex justify-center mb-4">
              <OTPInput
                value={otp}
                onChange={(newValue) => {
                  setOtp(newValue);
                  setFieldValue("otp", newValue);
                }}
                numInputs={6}
                renderInput={(props, index) => (
                  <input
                    id={`otp-input${index}`}
                    {...props}
                    className={`w-12.25 h-11.25 border border-solid border-[#00000025] rounded-md text-center text-light p-2 focus:outline focus:outline-[#28A745] caret-[#28A745] ${
                      touched.otp && errors.otp ? "border-red-500" : ""
                    }`}
                    style={{ width: "2.5rem", margin: "0 0.2rem" }}
                  />
                )}
              />
            </div>
            <span className="h-10.25 w-full text-red-500 text-sm text-center mt-1">
              <ErrorMessage name="otp" component="span" />
            </span>

            <button
              type="submit"
              disabled={isSubmitting || otp.length !== 6}
              className={`bg-[#28A745] w-full h-17.5 p-2 text-white text-lg font-medium border border-solid border-[#00000025] rounded-md hover:bg-green-700 ${
                isSubmitting || otp.length !== 6
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? "در حال بررسی..." : "تایید"}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CheckOTPForm;
