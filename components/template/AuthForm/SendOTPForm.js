"use client";
import Image from "next/image";
import { toast } from "react-toastify";

import { useSendOTP } from "service/mutations";
import { sendOTPSchema } from "core/schema/sendOTPSchema";
import { e2p } from "core/utils/replaceNumber";
import { Field, Form, Formik, ErrorMessage } from "formik";

function SendOTPForm({ setIsOpenModal, setStep, mobile, setMobile }) {
  const { mutate } = useSendOTP();

  const handleFormSubmit = (data) => {
    const { mobile } = data;
    mutate(
      { mobile },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message);
          toast(data?.data?.code);
          setMobile(mobile);
          setStep(2);
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <Formik
      initialValues={{ mobile }}
      validationSchema={sendOTPSchema}
      onSubmit={handleFormSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <div className="relative bg-white w-89.5 h-90.5 px-10  rounded-[20px]  shadow-[0_4px_4px_#00000025] md:w-140.25 md:h-90.5 ">
          <Form className="flex flex-col pt-14.75  ">
            <span
              className="absolute top-3 left-3 cursor-pointer "
              onClick={() => setIsOpenModal(false)}
            >
              <Image
                width={300}
                height={300}
                src="/svg/exit.svg"
                alt="Close"
                className="size-6"
              />
            </span>
            <h2 className="text-[22px] text-[#282828] text-center font-semibold mb-11.25 md:text-[28px] md:mb-9 ">
              ورود به تورینو
            </h2>

            <label
              htmlFor="mobile"
              className="  text-base font-light text-right mb-2.5"
            >
              شماره موبایل خود را وارد کنید
            </label>
            <Field
              className={`w-full h-13.5 border border-solid border-[#00000025] rounded-md text-right text-light p-2 focus:outline focus:outline-[#28A745] caret-[#28A745] ${
                errors.mobile && touched.mobile ? "border-red-500" : ""
              }`}
              type="tel"
              id="mobile"
              name="mobile"
              placeholder={e2p("0912***4253")}
              required
            />
            <span className="h-10.25 w-full text-red-500 text-sm text-right mt-1">
              <ErrorMessage name="mobile" component="span" />
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#28A745] w-full h-17.5 p-2 text-white text-lg font-medium border border-solid border-[#00000025] rounded-md hover:bg-green-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال کد تایید"}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default SendOTPForm;
