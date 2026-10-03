import { FOOTER_BRANDS_LOGO } from "@/constans/footerBrandsLogo";
import Image from "next/image";

function FooterBrands() {
  return (
    <section className="mt-6.5 flex flex-row-reverse justify-between md:flex-col  ">
      <section className="w-38.25  md:w-auto place-items-end    ">
        <Image
          src="/images/torino-logo.webp"
          width={160}
          height={160}
          alt="torino logo"
          className="w-25 h-7. md:w-36.5 h-11"
        />
        <p className="text-[14px] font-normal md:text-[15px]">
          تلفن پشتیبانی : ۸۵۷۴-۰۲۱
        </p>
      </section>
      <section className="w-34 md:w-auto  flex flex-wrap gap-4 justify-center md:flex-nowrap ">
        {FOOTER_BRANDS_LOGO.map((logo) => (
          <Image
            key={logo.id}
            src={logo.img}
            width={300}
            height={300}
            alt={logo.alt}
            className={`h-9.5 ${logo.width} ${logo.order} md:h-14 xl:h-18.5`}
          />
        ))}
      </section>
    </section>
  );
}

export default FooterBrands;
