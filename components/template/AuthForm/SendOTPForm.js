import ExitIcon from "@/icons/ExitIcon";
import { e2p, p2e } from "core/utils/replaceNumber";
import { useForm } from "react-hook-form";
import { sendOTPSchema } from "core/schema/sendOTPSchema";
import { useSendOTP } from "@/service/mutations";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SendOTPForm({ setIsOpenModal, setStep, setMobile }) {
  const { mutate } = useSendOTP();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sendOTPSchema),
  });

  const onSubmit = (data) => {
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
    <form
      className="relative bg-white w-89.5 h-90.5 px-10  rounded-[20px]  shadow-[0_4px_4px_#00000025] md:w-140.25 md:h-90.5 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <span
        className="absolute top-3 left-3 cursor-pointer"
        onClick={() => setIsOpenModal(false)}
      >
        <ExitIcon className="size-6" />
      </span>
      <h2 className="text-[22px] text-[#282828] text-center font-semibold mb-11.25 md:text-[28px] md:mb-9 ">
        ورود به تورینو
      </h2>
      <div className="flex flex-col">
        <label
          htmlFor="mobile"
          className="text-base font-light text-right mb-2.5"
        >
          شماره موبایل خود را وارد کنید
        </label>
        <input
          id="mobile"
          dir="ltr"
          placeholder={`${e2p("0 9 1 2 * * * 4 2 5 3")}`}
          className={`w-full h-13.5 border border-solid border-[#00000025] rounded-md text-right text-light p-2 focus:outline focus:outline-[#28A745] caret-[#28A745]`}
          {...register("mobile", {
            onChange: (e) => {
              e.target.value = e2p(e.target.value);
            },
            setValueAs: (value) => p2e(value),
          })}
        />
        <span className="h-10.25 w-full text-red-500 text-sm text-right mt-1">
          {errors.mobile?.message}
        </span>
      </div>

      <button
        type="submit"
        className={`bg-[#28A745] w-full h-17.5 p-2 text-white text-lg font-medium border border-solid border-[#00000025] rounded-md hover:bg-green-700 `}
      >
        ارسال کد تایید
      </button>
    </form>
  );
}
