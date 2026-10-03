import SunFogIcon from "@/icons/SunFogIcon";
import BusIcon from "@/icons/MyToursIcons/BusIcon";
import { vehicleToFa } from "core/utils/VehicleToFaFn";
import { cityToFa } from "core/utils/cityToFa";
import { getWeekday, toJalaliDate } from "core/utils/DateFn";
import { e2p } from "core/utils/replaceNumber";

function MyToursPage({ tour }) {
  const {
    startDate,
    endDate,
    fleetVehicle,
    price,
    title,
    origin: { name: originName },
    destination: { name: destinationName },
  } = tour;

  const today = new Date();

  return (
    <div className="relative border border-[#00000033] rounded-[10px]  text-[12px] text-[#00000099] pt-6 px-5 mt-5 md:text-[14px] ">
      {today < new Date(startDate) ? (
        <span className="absolute top-2 left-2 px-1.25 py-0.75 bg-[#28A7454D] text-[6px] text-[#28A745] font-normal rounded-[27px] md:text-[12px] ">
          شروع نشده
        </span>
      ) : today < new Date(endDate) ? (
        <span className="absolute top-2 left-2 px-1.25 py-0.75 bg-[#D1B9004D] text-[6px] text-[#D1B900] font-normal rounded-[27px] md:text-[12px] ">
          در حال برگزاری
        </span>
      ) : (
        <span className="absolute top-2 left-2 px-1.25 py-0.75 bg-[#28A7454D] text-[6px] text-[#28A745] font-normal rounded-[27px] md:text-[12px] ">
          به اتمام رسیده
        </span>
      )}

      <div className="flex gap-4 mb-5 md:mb-5.75 md:gap-36.25 ">
        <div className="flex flex-row-reverse gap-2 ">
          <p>{title}</p>
          <SunFogIcon className="size-4 md:size-6" />
        </div>
        <div className="flex flex-row-reverse gap-2 ">
          <p>
            <span>سفر با </span>
            <span>{vehicleToFa(fleetVehicle)}</span>
          </p>
          <BusIcon className="size-4.5 md:size-6 text-[#282828E5]" />
        </div>
      </div>

      <div className="mb-5 md:flex md:gap-10.5 md:mb-0 ">
        <div className="flex justify-between md:gap-4">
          <div className="flex gap-1 text-[#000000] text-[14px] font-semibold mb-7">
            <p>{cityToFa(originName)}</p>
            <p>به</p>
            <p>{cityToFa(destinationName)}</p>
          </div>

          <div className="flex gap-1 relative">
            <span className="size-0.75 bg-[#00000099]  rounded-full absolute -right-2.5 top-1.5 "></span>
            <span>{getWeekday(startDate)}</span>
            <span>{e2p(toJalaliDate(startDate))}</span>
          </div>
        </div>

        <div className="flex justify-between text-[#00000099] md:gap-4">
          <span className="text-[#000000] text-[14px] font-semibold">
            تاریخ برگشت
          </span>
          <div className="flex gap-1 relative ">
            <span className="size-0.75 bg-[#00000099]  rounded-full absolute -right-2.5 top-1.5 "></span>
            <span>{getWeekday(endDate)}</span>
            <span>{e2p(toJalaliDate(endDate))}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between  items-center py-4 text-[10px] md:text-[14px] border-t border-t-[#00000033] -mx-5 px-2 md:justify-start md:gap-5.5 ">
        <div className="flex items-baseline gap-4 md:gap-2">
          <span className="">شماره تور</span>
          <span className="text-[12px] font-semibold text-[#282828]">
            {e2p(102095404)}
          </span>
        </div>

        <span className="h-7.5 w-[0.75px]  bg-[#00000033]"></span>

        <div className="flex items-baseline gap-4 md:gap-2">
          <span>مبلغ پرداخت شده</span>
          <span className="flex items-baseline">
            <span className="text-[12px] font-semibold text-[#282828]">
              {e2p(price)}
            </span>
            <span className="mr-1 text-[10px]">تومان</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default MyToursPage;
