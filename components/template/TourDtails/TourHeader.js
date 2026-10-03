import MapIcon from "@/icons/TourDetails/MapIcon";
import MedalStar from "@/icons/TourDetails/MedalStar";
import UserTick from "@/icons/TourDetails/UserTick";
import { tourDays } from "core/utils/DateFn";
import { e2p } from "core/utils/replaceNumber";

function TourHeader({ className, title, startDate, endDate }) {
  const tourDaysNum = tourDays(startDate, endDate);
  const tourNightsNum = tourDaysNum - 1;

  return (
    <div className={className}>
      <div className=" flex justify-between  mb-3 md:flex-col">
        <h2 className="text-[24px]  lg:text-[32px] font-bold">{title}</h2>

        <p className="text-[#282828] text-[15px]  lg:text-[20px] font-normal flex gap-1 ">
          <span>{e2p(tourDaysNum)}</span>
          <span>روز</span>
          <span>و</span>
          <span>{e2p(tourNightsNum)}</span>
          <span>شب</span>
        </p>
      </div>

      <div className="mb-6 py-2 flex  justify-between text-[13px] font-normal text-[#7D7D7D] md:mb-0 lg:text-[16px] xl:text-[20px]">
        <span className="flex justify-between  items-center gap-2">
          <UserTick className="size-3.5 lg:size-4.5 xl:size-6" />
          <p>تورلیدر از مبدا</p>
        </span>

        <span className="flex justify-between items-center gap-2">
          <MapIcon className=" size-3.5 lg:size-4.5 xl:size-6" />
          <p>برنامه سفر</p>
        </span>

        <span className="flex justify-between items-center gap-2">
          <MedalStar className="size-3.5 lg:size-4.5 xl:size-6" />
          <p> تضمین کیفیت</p>
        </span>
      </div>
    </div>
  );
}

export default TourHeader;
