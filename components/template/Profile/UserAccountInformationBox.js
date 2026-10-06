"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEditProfile } from "@/service/mutations";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import EditIcon from "@/icons/ProfileIcon/EditIcon";

import { e2p } from "core/utils/replaceNumber";
import { UserAccountInformationBoxSchema } from "core/schema/UserAccountInformationBoxSchema";

function UserAccountInformationBox({ data, className }) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(UserAccountInformationBoxSchema) });

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
        email: data?.email || "",
      });
  }, [data, isEditing]);

  return (
    <form
      className={`text-[14px] font-normal flex flex-col ${className}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {isEditing ? (
        <h3 className="text-[16px] mb-7 font-normal">
          ویرایش اطلاعات حساب کاربری
        </h3>
      ) : (
        <div className="flex justify-between items-center text-[16px] mb-7 font-normal">
          <h3>اطلاعات حساب کاربری</h3>
          <div
            className="flex gap-2 items-center text-[14px] text-[#009ECA] cursor-pointer hover:text-[#007A9E]"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon className="size-4" />
            <span> ویرایش اطلاعات</span>
          </div>
        </div>
      )}

      <div className="w-full  flex flex-col gap-6 text-[14px] font-light lg:flex-row lg:justify-between">
        <div className="flex justify-between items-center gap-10.25">
          <span className="font-light">شماره موبایل</span>
          <span>{e2p(data?.mobile)}</span>
        </div>
        {isEditing ? (
          <div className="lg:w-70">
            <input
              className="w-full p-2 border border-[#00000050] rounded-[5px]  focus:outline-[#28A745] focus:placeholder:text-[#28A745] "
              placeholder="ایمیل"
              {...register("email")}
            />
            <p className="text-sm text-[#DC3545]">{errors.email?.message}</p>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center gap-10.25">
              <span className="font-light">ایمیل</span>
              {data?.email ? (
                <span>{e2p(data?.email)}</span>
              ) : (
                <span className=" w-3 border border-[#282828]"></span>
              )}
            </div>
          </div>
        )}
      </div>

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

export default UserAccountInformationBox;
