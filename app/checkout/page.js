"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "components/layout/Container";
import { useGetBasket } from "@/service/queries";

import ProfileIcon from "@/icons/ProfileIcon";
import { convertDateForApi, tourDays } from "core/utils/DateFn";
import { e2p, spNum } from "core/utils/replaceNumber";
import { checkoutFormSchema } from "core/schema/checkoutFormSchema";
import { useCheckout } from "@/service/mutations";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { DatePicker } from "zaman";

function Checkout() {
  const { data } = useGetBasket();
  const router = useRouter();

  const tourPrice = data?.data?.price;
  const tourTitle = data?.data?.title;
  const startDate = data?.data?.startDate;
  const endDate = data?.data?.endDate;

  const tourDaysNum = tourDays(startDate, endDate);
  const tourNightsNum = tourDaysNum - 1;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      gender: "",
      nationalCode: "",
    },
  });

  const { isPending, mutate } = useCheckout();

  const onSubmit = (data) => {
    if (isPending) return;

    mutate(
      { ...data },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message);
          router.push("/payment?status=success");
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <Container>
      {!data ? (
        <p className="bg-green-500 text-center text-white w-full my-5 py-5 rounded-xl ">
          سبد خرید خالی است.
        </p>
      ) : (
        <form
          className="py-4 mt-4.25 px-5 text-[#282828] text-[14px] border border-[#00000033] rounded-[10px]"
          id="check-out"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mr-5.75 flex gap-3 items-center text-[24px] font-normal">
            <ProfileIcon className="size-6" />
            <h2>مشخصات مسافر</h2>
          </div>
          <div className="flex flex-col">
            <input
              className="mt-6 p-2 border border-[#00000050] rounded-[5px]  focus:outline-[#28A745] focus:placeholder:text-[#28A745] "
              placeholder="نام و نام خانوادگی"
              {...register("fullName")}
            />
            <p className="h-6 text-[#DC2626]">{errors.fullName?.message}</p>

            <select
              className="p-2 border  border-[#00000050] rounded-[5px] placeholder:text-[#00000050]  focus:outline-[#28A745] focus:text-[#28A745] "
              {...register("gender")}
            >
              <option disabled value="">
                جنسیت
              </option>
              <option value="female">زن</option>
              <option value="male">مرد</option>
            </select>
            <p className="h-6 text-[#DC2626]">{errors.gender?.message}</p>
            <input
              className="p-2  border border-[#00000050] rounded-[5px]  focus:outline-[#28A745] focus:placeholder:text-[#28A745] focus:text-[#28A745] "
              placeholder="کد ملی"
              {...register("nationalCode")}
            />
            <p className="h-6 text-[#DC2626]">{errors.nationalCode?.message}</p>
            <Controller
              control={control}
              name="birthDate"
              render={({ field: { onChange } }) => (
                <DatePicker
                  accentColor="#28A745"
                  inputClass="w-full mt-3 mb-6 peer p-2 border text-[#282828] border-[#00000015] rounded-xl  focus:outline-none focus:border-[#28a746b9] focus:text-[#28a746b9] focus:cursor-[#28a746b9]"
                  round="x2"
                  onChange={(e) => onChange(convertDateForApi(e.value))}
                />
              )}
            />
          </div>
          <p className="h-6 text-[#DC2626]">{errors.date?.message}</p>
          <div className="py-4 px-3.25 mt-8.75 mb-9.25 border border-[#0000001A] rounded-[10px]">
            <div className="mb-7.25 pb-6 flex justify-between items-center border-b  border-dashed border-b-[#00000080]">
              <h3 className="text-[24px] font-semibold ">{tourTitle}</h3>
              <p className="text-[#7D7D7D] text-[16px] font-normal lg:text-[20px] flex gap-1">
                <span>{e2p(tourDaysNum)}</span>
                <span>روز</span>
                <span>و</span>
                <span>{e2p(tourNightsNum)}</span>
                <span>شب</span>
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[16px] font-normal">قیمت نهایی</span>
              <div>
                <span className="ml-1.5 text-[#009ECA] text-[28px] font-medium">
                  {spNum(+tourPrice)}
                </span>
                <span className="text-[14px] text-[#00000080]">تومان</span>
              </div>
            </div>

            <button
              type="submit"
              form="check-out"
              className="w-full h-14 bg-[#28A745] my-4 p-2 rounded-[10px] text-[#FFFFFF] hover:bg-green-500 cursor-pointer  "
            >
              ثبت و خرید نهایی
            </button>
          </div>
        </form>
      )}
    </Container>
  );
}

export default Checkout;
