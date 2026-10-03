"use client";
import { DatePicker } from "zaman";
import { Controller, useForm } from "react-hook-form";

import { getUniqueByKey } from "core/utils/uniqueFuncions";
import { useEffect, useRef, useState } from "react";
import CityDropdown from "./CityDropdown";
import { useRouter } from "next/navigation";
import useQuery from "core/hooks/query";
import { flattenObject } from "core/utils/helper";
import QueryString from "qs";
import LocationIcon from "@/icons/LocationIcon";
import DestinationSearchIcon from "@/icons/DestinationSearchIcon";
import CalendarSearchIcon from "@/icons/CalendarSearchIcon";

function TourSearch({ className, toursData }) {
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  // تغییر ۱: watch اضافه شد تا بتوانیم مقدار لحظه‌ای input ها را بخوانیم
  const { register, handleSubmit, reset, setValue, control, watch } = useForm();
  const { getQuery } = useQuery();

  // تغییر ۲: متن فعلی input مبدا و مقصد (با هر تایپ دوباره رندر می‌شود)
  const originName = watch("originName");
  const destinationName = watch("destinationName");

  useEffect(() => {
    const handler = (e) => {
      if (
        originRef.current.contains(e.target) ||
        destinationRef.current.contains(e.target)
      )
        return;

      setIsDropdownOpen(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    const originId = getQuery("originId");
    const destinationId = getQuery("destinationId");
    if (originId && destinationId) reset({ originId, destinationId });
  }, []);

  const originCities = getUniqueByKey(
    toursData?.map((tour) => tour.origin),
    "id"
  );

  const destinationCities = getUniqueByKey(
    toursData?.map((tour) => tour.destination),
    "id"
  );

  const submitHandler = (data) => {
    const { originId, destinationId } = data;

    const query = QueryString.stringify(
      flattenObject({ originId, destinationId })
    );
    router.push(`?${query}`);
  };

  return (
    <form
      className={`flex flex-col mb-3 text-[#00000050] md:flex-row  md:items-center md:border md:border-[#00000015] md:max-w-218.5 md:rounded-[20px] md:p-2  ${className}`}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="w-full flex gap-2 md:w-4/10 mb-3 md:mb-0 ">
        <div
          className="relative w-1/2 flex justify-center items-center"
          ref={originRef}
        >
          <input
            id="tourOrigin"
            placeholder=" "
            autoComplete="off"
            // تغییر ۳: با هر تایپ، id شهر قبلی پاک می‌شود (تا جستجو با شهر اشتباه انجام نشود)
            // و دراپ‌داون باز می‌شود (تا حتی بعد از انتخاب شهر، با تایپ دوباره نمایش داده شود)
            {...register("originName", {
              onChange: () => {
                setValue("originId", "");
                setIsDropdownOpen("origin");
              },
            })}
            className="peer w-full  p-2 border text-[#282828] border-[#00000015] rounded-lg  focus:outline-none focus:border-[#28a746b9] md:focus:border-[#00000015] focus:text-[#28a746b9] focus:cursor-[#28a746b9] md:border-0"
            onClick={() => setIsDropdownOpen("origin")}
          />
          <label
            htmlFor="tourOrigin"
            className="absolute flex flex-row-reverse items-center justify-baseline gap-2  transition-all duration-300 text-[16px]  px-1 bg-white  peer-not-placeholder-shown:hidden"
          >
            <span>مبدا</span>
            <LocationIcon className="size-4.5" />
          </label>
          {isDropdownOpen === "origin" && (
            <CityDropdown
              cities={originCities}
              field="origin"
              // تغییر ۴: متن تایپ‌شده به دراپ‌داون داده می‌شود تا فیلتر کند
              search={originName}
              setIsDropdownOpen={setIsDropdownOpen}
              setValue={setValue}
            />
          )}
        </div>
        <div
          className="relative w-1/2 flex justify-center items-center"
          ref={destinationRef}
        >
          <input
            id="tourDestination"
            placeholder=" "
            autoComplete="off"
            // تغییر ۵: همان منطق مبدا برای مقصد
            {...register("destinationName", {
              onChange: () => {
                setValue("destinationId", "");
                setIsDropdownOpen("destination");
              },
            })}
            className="w-full peer p-2 border text-[#282828] border-[#00000015] rounded-lg  focus:outline-none focus:border-[#28a746b9] md:focus:border-[#00000015] focus:text-[#28a746b9] focus:cursor-[#28a746b9] md:rounded-none md:border-0 md:border-r "
            onClick={() => setIsDropdownOpen("destination")}
          />
          <label
            htmlFor="tourDestination"
            className="absolute flex flex-row-reverse items-center justify-baseline gap-2  transition-all duration-300 text-[16px]  px-1 bg-white peer-not-placeholder-shown:hidden "
          >
            <span>مقصد</span>
            <DestinationSearchIcon className="size-4.5" />
          </label>
          {isDropdownOpen === "destination" && (
            <CityDropdown
              cities={destinationCities}
              field="destination"
              // تغییر ۶: متن مقصد به دراپ‌داون داده می‌شود
              search={destinationName}
              setIsDropdownOpen={setIsDropdownOpen}
              setValue={setValue}
            />
          )}
        </div>
      </div>

      <div className="md:w-4/10 md:text-[14px]">
        <Controller
          control={control}
          id="date"
          name="date"
          render={({ field: { onChange } }) => {
            return (
              <div className="flex justify-center items-center mb-6 md:mb-0 overflow-auto">
                <DatePicker
                  inputAttributes={{
                    placeholder: " ",
                  }}
                  accentColor="#28A745"
                  range
                  inputClass="w-full  peer p-2 border text-[#282828]  border-[#00000015] rounded-lg  focus:outline-none focus:border-[#28a746b9] md:focus:border-[#00000015] focus:text-[#28a746b9] focus:cursor-[#28a746b9] md:rounded-none md:border-0 md:border-r "
                  round="x2"
                  onChange={(e) => {
                    onChange({ startDate: e.from, endDate: e.to });
                  }}
                />

                <label
                  htmlFor="date"
                  className="absolute flex flex-row-reverse items-center justify-baseline gap-2 transition-all duration-300 text-[16px] px-1 bg-white peer-not-placeholder-shown:hidden"
                >
                  <span>تاریخ</span>
                  <CalendarSearchIcon className="size-4.5" />
                </label>
              </div>
            );
          }}
        />
      </div>
      <div className="md:w-2/10 flex justify-center">
        <button
          type="submit"
          className="w-full  bg-[#28A745] text-white md:max-w-50 rounded-lg p-2  hover:bg-primary-darker"
        >
          جستجو
        </button>
      </div>
    </form>
  );
}

export default TourSearch;
