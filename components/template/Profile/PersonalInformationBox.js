"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { convertDateForApi, toJalaliDateString } from "core/utils/DateFn";
import { useEditProfile } from "@/service/mutations";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import EditIcon from "@/icons/ProfileIcon/EditIcon";
import { personalInformationBoxSchema } from "core/schema/personalInformationBoxSchema";
import { e2p, p2e } from "core/utils/replaceNumber";
import { genderMap } from "core/utils/genderMap";
import { DatePicker } from "zaman";

function PersonalInformationBox({ data, className }) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(personalInformationBoxSchema),
  });

  const { isPending, mutate } = useEditProfile();

  const onSubmit = (data) => {
    if (isPending) return;

    mutate(
      { ...data },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message);
          setIsEditing(false);
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  useEffect(() => {
    if (!data) return;
    if (data && isEditing === true)
      reset({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        gender: data?.gender || "",
        nationalCode: data?.nationalCode ? `${e2p(data?.nationalCode)}` : "",
        birthDate: data?.birthDate || "",
      });
  }, [data, isEditing]);

  return (
    <form
      className={`text-[14px] font-normal flex flex-col ${className}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {isEditing ? (
        <div>
          <h2 className="text-[16px] mb-7 font-normal">ویرایش اطلاعات شخصی</h2>

          <div className="flex flex-col gap-4 md:flex-none md:grid md:grid-cols-2 md:grid-flow-row 2xl:grid-cols-3">
            <div>
              <input
                className="w-full p-2 border border-[#00000050] rounded-[5px]  focus:outline-[#28A745] focus:placeholder:text-[#28A745] "
                placeholder="نام"
                id="firstName"
                {...register("firstName")}
              />
              <p className="text-sm text-[#DC3545]">
                {errors.firstName?.message}
              </p>
            </div>

            <div>
              <input
                className="w-full p-2 border border-[#00000050] rounded-[5px]  focus:outline-[#28A745] focus:placeholder:text-[#28A745] "
                placeholder="نام خانوادگی"
                {...register("lastName")}
              />
              <p className="text-sm text-[#DC3545]">
                {errors.lastName?.message}
              </p>
            </div>

            <div>
              <input
                className="w-full p-2 border border-[#00000050] rounded-[5px]  focus:outline-[#28A745] focus:placeholder:text-[#28A745]"
                placeholder="کد ملی"
                {...register("nationalCode", {
                  onChange: (event) => {
                    event.target.value = e2p(event.target.value);
                  },
                  setValueAs: (value) => {
                    return p2e(value);
                  },
                })}
              />
              <p className="text-sm text-[#DC3545]">
                {errors.nationalCode?.message}
              </p>
            </div>

            <div>
              <select
                className="w-full p-2 border border-[#00000050] rounded-[5px]  focus:outline-[#28A745] focus:placeholder:text-[#28A745]"
                {...register("gender")}
              >
                <option disabled value="">
                  جنسیت
                </option>
                <option value="female">زن</option>
                <option value="male">مرد</option>
              </select>
              <p className="text-sm text-[#DC3545]">{errors.gender?.message}</p>
            </div>

            <div className="w-full relative">
              <Controller
                control={control}
                name="birthDate"
                render={({ field: { onChange } }) => (
                  <div className="relative">
                    <DatePicker
                      placeholder=" "
                      accentColor="#28A745"
                      inputClass=" w-full  peer p-2 border  text-[#282828] border border-[#00000050] rounded-[5px]  focus:outline-none  focus:border-[#28a746b9] focus:text-[#28a746b9] focus:cursor-[#28a746b9]"
                      round="x2"
                      onChange={(e) =>
                        onChange(e?.value ? convertDateForApi(e.value) : "")
                      }
                    />
                    <label className="absolute right-2 translate-y-1/2 text-[#00000050] peer-not-placeholder-shown:hidden">
                      تاریخ
                    </label>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center text-[16px] mb-7 font-normal">
            <h3>اطلاعات شخصی</h3>
            <div
              className="flex gap-2 items-center text-[14px] text-[#009ECA] cursor-pointer hover:text-[#007A9E]"
              onClick={() => setIsEditing(true)}
            >
              <EditIcon className="size-4" />
              <span> ویرایش اطلاعات</span>
            </div>
          </div>
          <div className="w-full mt-8.5 flex flex-col gap-6 text-[14px] font-light">
            <div className="flex justify-between items-center gap-10.25">
              <span className="font-light">نام و نام خانوادگی</span>
              {data?.firstName && data?.lastName ? (
                <span>{`${data?.firstName} ${data?.lastName}`}</span>
              ) : (
                <span className=" w-3 border border-[#282828]"></span>
              )}
            </div>

            <div className="flex justify-between items-center gap-10.25">
              <span className="font-light">کد ملی</span>
              {data?.nationalCode ? (
                <span>{e2p(data?.nationalCode)}</span>
              ) : (
                <span className=" w-3 border border-[#282828]"></span>
              )}
            </div>

            <div className="flex justify-between items-center gap-10.25">
              <span className="font-light">جنسیت</span>
              {data?.gender ? (
                <span>{genderMap[data?.gender]}</span>
              ) : (
                <span className=" w-3 border border-[#282828]"></span>
              )}
            </div>

            <div className="flex justify-between items-center gap-10.25">
              <span className="font-light">تاریخ تولد</span>
              {data?.birthDate ? (
                <span>{e2p(toJalaliDateString(data?.birthDate))}</span>
              ) : (
                <span className=" w-3 border border-[#282828]"></span>
              )}
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="mt-5  flex justify-between items-center gap-3 text-center text-[16px] font-medium md:justify-end md:border-t md:border-[#00000033] md:-mx-5 md:px-5 md:py-2 md:-mb-5 ">
          <button
            className="w-full p-2 bg-[#28A745]  text-white rounded-[5px] hover:bg-primary-dark active:bg-[#1e7e34] active:scale-[0.98] transition-colors cursor-pointer md:w-36 md:h-10.25 "
            type="submit"
          >
            تایید
          </button>
          <button
            type="button"
            className="w-full p-2 border-2 border-[#28A745] rounded-[5px] text-[#28A745] hover:bg-green-200 active:bg-green-100 active:scale-[0.98] transition-colors cursor-pointer md:w-36 md:h-10.25"
            onClick={() => setIsEditing(false)}
          >
            انصراف
          </button>
        </div>
      )}
    </form>
  );
}

export default PersonalInformationBox;
