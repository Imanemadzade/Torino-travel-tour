import Container from "components/layout/Container";

import TourHeader from "./TourHeader";
import TourImage from "./TourImage";
import TourInfo from "./TourInfo";
import ReserveSection from "./ReserveSection";

function TourDtails({
  id,
  image,
  price,
  title,
  startDate,
  endDate,
  fleetVehicle,
  availableSeats,
  origin: { name: origin },
  insurance,
}) {
  return (
    <div className="md:bg-[#F3F3F3]">
      <Container className="pb-13.5 md:pt-9 md:pb-24.75 ">
        <div className="pt-5.75 md:pt-7.25 md:pr-5 md:pl-6 md:pb-5 md:bg-[#ffffff] md:rounded-[10px] ">
          <div className=" md:grid  md:grid-cols-12  ">
            <TourImage
              className="md:col-span-5 md:row-span-2 "
              image={image}
              name={origin}
            />

            <TourHeader
              className="md:pr-4 lg:pr-6 md:col-span-6"
              title={title}
              startDate={startDate}
              endDate={endDate}
            />

            <TourInfo
              className="md:row-start-3 md:col-span-full"
              origin={origin}
              fleetVehicle={fleetVehicle}
              price={price}
              availableSeats={availableSeats}
              insurance={insurance}
              startDate={startDate}
              endDate={endDate}
            />

            <ReserveSection
              className="md:pr-4 md:col-span-7 lg:pr-6 md:mt-0 md:flex-row-reverse"
              id={id}
              price={price}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TourDtails;
