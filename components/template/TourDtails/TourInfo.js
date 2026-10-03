import BusIcon from "@/icons/TourDetails/BusIcon";
import Calender2Icon from "@/icons/TourDetails/Calender2Icon";
import CalenderIcon from "@/icons/TourDetails/CalenderIcon";
import Profile2UsersIcon from "@/icons/TourDetails/Profile2UsersIcon";
import Routing2Icon from "@/icons/TourDetails/Routing2Icon";
import SecurityIcon from "@/icons/TourDetails/SecurityIcon";
import { cityToFa } from "core/utils/cityToFa";
import { e2p } from "core/utils/replaceNumber";
import { vehicleToFa } from "core/utils/VehicleToFaFn";
import { toJalaliDate } from "core/utils/DateFn";

function TourInfo({
  className,
  origin,
  fleetVehicle,
  insurance,
  availableSeats,
  startDate,
  endDate,
}) {
  const jalaaliStartDate = e2p(toJalaliDate(startDate));

  const jalaaliEndDate = e2p(toJalaliDate(endDate));

  const tourInfoItems = [
    {
      id: 1,
      icon: Routing2Icon,
      title: "مبدا",
      text: cityToFa(origin),
    },
    {
      id: 2,
      icon: CalenderIcon,
      title: "تاریخ رفت",
      text: jalaaliStartDate,
    },
    {
      id: 3,
      icon: Calender2Icon,
      title: "تاریخ برگشت",
      text: jalaaliEndDate,
    },
    {
      id: 4,
      icon: BusIcon,
      title: "حمل و نقل",
      text: vehicleToFa(fleetVehicle),
    },
    {
      id: 5,
      icon: Profile2UsersIcon,
      title: "ظرفیت",
      text: `حداکثر ${e2p(availableSeats)} `,
    },
    {
      id: 6,
      icon: SecurityIcon,
      title: "بیمه",
      text: insurance ? "دارد" : "ندارد",
    },
  ];

  return (
    <div
      className={`${className} grid grid-cols-3  justify-items-start gap-x-2  gap-y-6 text-[14px]  md:flex md:justify-between md:divide-x md:py-7.5`}
    >
      {tourInfoItems.map((item) => (
        <div className="md:pl-4 lg:pl-8" key={item.id}>
          <div className="flex  items-center  gap-2 ">
            <item.icon className="size-4 " />
            <p className=" text-[#444444]">{item.title}</p>
          </div>
          <p className="pr-2  text-[#282828] text-[12px]">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export default TourInfo;
