import ImageCarousel from "./ImageCarousel";

const TOUR_TITLE = "تور طبیعت گردی و تاریخی";
const TOUR_DESCRIPTION =
  "اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی را خریداری کنید.";

function TourismServices({ className = "" }) {
  return (
    <section id="tourism-services" className={`mt-3 w-full ${className}`}>
      <header className="flex gap-1 text-lg font-extrabold sm:text-2xl">
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-linear-[#28A745,#10411B] font-black text-white sm:size-9.5"
        >
          ؟
        </span>
        <h4>
          چرا <span className="text-primary">تورینو</span> ؟
        </h4>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Text column: desktop only */}
        <div className="hidden lg:block lg:w-1/2">
          <h5 className="mb-4 mt-8 hidden text-justify text-2xl 2xl:block">
            {TOUR_TITLE}
          </h5>
          <p className="text-xl font-normal leading-14">{TOUR_DESCRIPTION}</p>
        </div>

        {/* Carousel column: full width on mobile, half on desktop */}
        <div className="mt-5 w-full lg:mt-0 lg:w-1/2">
          <ImageCarousel />
        </div>
      </div>
    </section>
  );
}

export default TourismServices;