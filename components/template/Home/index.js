import Image from "next/image";

import ToursCard from "./ToursCard";
import TourSearch from "./TourSearch";
import Container from "components/layout/Container";
import ContactUs from "./ContactUs";
import TourismServices from "./TourismServices";
import Features from "./FeatureItem";

async function HomePage({ toursData }) {
  return (
    <>
      {toursData ? (
        <main>
          <Image
            src="/images/banner-image.webp"
            width={1000}
            height={1000}
            alt="Torino Banner"
            className="w-full h-29.75 mb-6 md:h-40 lg:h-87.5 lg:mb-4.25"
          />
          <div className="flex">
            <h1 className=" text-[16px] text-[#595959] font-semibold m-auto  lg:text-[28px]">
              <span className="text-[#28A745]">تورینو</span> برگزار کننده بهترین
              تور های داخلی و خارجی
            </h1>
          </div>
          <Container>
            <TourSearch toursData={toursData} className="mt-6.25 mx-auto" />
            <h2 className="mb-2 text-[20px] font-normal">همه تورها</h2>
            <div className="grid grid-cols-1  justify-between  sm:grid-cols-2 sm:gap-8.75 lg:grid-cols-3 xl:grid-cols-4  ">
              {toursData?.map((tour) => (
                <ToursCard key={tour?.id} {...tour} />
              ))}
            </div>
            <ContactUs className="mt-20.5" />
            <TourismServices className="mt-22.5" />
            <Features className="mt-15 py-7.5 border-t border-[#00000025]" />
          </Container>
        </main>
      ) : (
        <Container>
          <p className="bg-green-500 py-5 mt-5 mb-20 rounded-xl text-center text-xl text-white font-light">
            توری وجود ندارد .
          </p>
        </Container>
      )}
    </>
  );
}

export default HomePage;
