import Image from "next/image";

import { e2p, spNum } from "core/utils/replaceNumber";
import { tourDays } from "core/utils/DateFn";
import { vehicleToFa } from "core/utils/VehicleToFaFn";
import Link from "next/link";
import { getImageUrl } from "core/utils/imageUrl";

function ToursCard({
  id,
  image,
  price,
  title,
  startDate,
  endDate,
  fleetVehicle,
  options,
  origin: { name },
}) {
 

  return (
    <section className="w-full  mb-8.75  rounded-[10px]  shadow-[0_0_2px_#00000025] flex flex-col  ">
      <Image
        src={getImageUrl(image)}
        width={1000}
        height={1000}
        alt={`${name} picture`}
        className="w-full aspect-4/3 object-cover mb-2  "
      />
      <div>
        <h3 className="mb-1.5 mr-2.5 text-[22px] font-normal ">{title}</h3>
        <p className="mb-1.5 mr-2.5 text-[#282828B2] text-[13px] font-normal ">
          مهرماه .{e2p(tourDays(startDate, endDate))} روزه -{" "}
          {vehicleToFa(fleetVehicle)} -{options?.[1]}...
        </p>
      </div>

      <div className="text-[#282828B2]  border-t border-t-[#D9D9D9] mt-auto mx-1.5 h-10.25  flex justify-between items-center">
        <Link
          href={`/tours/${id}`}
          className=" flex items-center  justify-center w-24.75 h-7.25 bg-[#28A745] text-white rounded-sm text-[15px] font-normal sm:w-16 "
        >
          رزرو
        </Link>
        <div>
          <span
            className="ml-1.5
          text-[#009ECA] "
          >
            {spNum(+price)}
          </span>
          تومان
        </div>
      </div>
    </section>
  );
}

export default ToursCard;
