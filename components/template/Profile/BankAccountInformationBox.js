"use client";

import { useForm } from "react-hook-form";
import { BankAccountInformationBoxSchema } from "core/schema/BankAccountInformationBoxSchema";

import { useEditProfile } from "@/service/mutations";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import EditIcon from "@/icons/ProfileIcon/EditIcon";
import { e2p, p2e } from "core/utils/replaceNumber";
import { yupResolver } from "@hookform/resolvers/yup";

function BankAccountInformationBox({ data, className }) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(BankAccountInformationBoxSchema) });

  const { isPending, mutate } = useEditProfile();

  const onSubmit = (data) => {
    if (isPending) return;
    const payment = { ...data };

    mutate(
      { payment },
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
        debitCardCode: data?.payment?.debitCardCode
          ? `${e2p(data?.payment?.debitCardCode)}`
          : "",

        ShabaCode: data?.payment?.ShabaCode
          ? `${e2p(data?.payment?.ShabaCode)}`
          : "",

        accountIdentifier: data?.payment?.accountIdentifier
          ? `${e2p(data?.payment?.accountIdentifier)}`
          : "",
      });
  }, [data, isEditing]);

  return (
    <form
      className={`text-[14px] font-normal flex flex-col ${className}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {isEditing ? (
        <div>
          <h2 className="text-[16px] mb-7 font-normal">
            ویرایش اطلاعات حساب بانکی
          </h2>

          <div className="flex flex-col gap-4 md:flex-none md:grid md:grid-cols-2 md:grid-flow-row 2xl:grid-cols-3  ">
            <div>
              <input
                className=" w-full p-2 border border-[#00000050] rounded-[5px]  focus:outline-[#28A745] focus:placeholder:text-[#28A745]"
                placeholder="شماره کارت"
                id="debitCardCode"
                {...register("debitCardCode", {
                  onChange: (e) => {
                    e.target.value = e2p(e.target.value);
                  },
                  setValueAs: (value) => p2e(value),
                })}
              />
              <p className="text-sm text-[#DC3545]">
                {errors.debitCardCode?.message}
              </p>
            </div>

            <div>
              <input
                className="w-full p-2 border border-[#00000050] rounded-[5px]  focus:outline-[#28A745] focus:placeholder:text-[#28A745] "
                placeholder="شماره شبا"
                {...register("ShabaCode", {
                  onChange: (e) => {
                    e.target.value = e2p(e.target.value);
                  },
                  setValueAs: (value) => p2e(value),
                })}
              />
              <p className="text-sm text-[#DC3545]">
                {errors.ShabaCode?.message}
              </p>
            </div>

            <div>
              <input
                className="w-full p-2 border border-[#00000050] rounded-[5px]  focus:outline-[#28A745] focus:placeholder:text-[#28A745]"
                placeholder="شماره حساب"
                {...register("accountIdentifier", {
                  onChange: (e) => {
                    e.target.value = e2p(e.target.value);
                  },
                  setValueAs: (value) => p2e(value),
                })}
              />
              <p className="text-sm text-[#DC3545]">
                {errors.accountIdentifier?.message}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center text-[16px] mb-7 font-normal">
            <h3>اطلاعات حساب بانکی</h3>
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
              <span className="font-light">شماره کارت</span>
              {data?.payment?.debitCardCode ? (
                <span>{e2p(data?.payment?.debitCardCode)}</span>
              ) : (
                <span className=" w-3 border border-[#282828]"></span>
              )}
            </div>

            <div className="flex justify-between items-center gap-10.25">
              <span className="font-light">شماره شبا</span>
              {data?.payment?.ShabaCode ? (
                <span>{e2p(data?.payment?.ShabaCode)}</span>
              ) : (
                <span className=" w-3 border border-[#282828]"></span>
              )}
            </div>

            <div className="flex justify-between items-center gap-10.25">
              <span className="font-light">شماره حساب</span>
              {data?.payment?.accountIdentifier ? (
                <span>{e2p(data?.payment?.accountIdentifier)}</span>
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
            className="w-full p-2 bg-[#28A745]  text-white rounded-[5px] hover:bg-primary-dark active:bg-[#1e7e34] active:scale-[0.98] transition-colors cursor-pointer md:w-36 md:h-10.25"
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

export default BankAccountInformationBox;
