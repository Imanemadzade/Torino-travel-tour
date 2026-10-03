import CallIcon from "@/icons/CallIcon";
import { e2p } from "core/utils/replaceNumber";
import Image from "next/image";

function ContactUs({ className }) {
  return (
    <div className={`relative text-white ${className}`}>
      <div
        className="border border-[#00000025] rounded-[10px] text-[14px] xl:flex xl:flex-row xl:overflow-hidden"
        id="contact-us"
      >
        <div className="relative bg-primary pt-3 px-3 rounded-t-[10px] xl:w-3/4 xl:text-[32px] xl:px-14.25 xl:rounded-[10px] xl:pt-9">
          <p className="text-[22px]  font-extrabold pb-2 xl:text-[48px]">
            <span>خرید تلفنی از</span>
            <span className="text-secondary">تورینو</span>
          </p>
          <p className="font-normal pb-12.5 xl:pb-20.75">
            به هرکجا که میخواهید!
          </p>
          <div>
            <Image
              src="/images/contact-us-pic.webp"
              alt="تصویر ارتباط با ما"
              width={700}
              height={700}
              className="w-48.75 absolute bottom-0 left-0 xl:w-74 xl:h-56.5 xl:left-11"
            />
          </div>
        </div>

        <div className="flex flex-row-reverse justify-between items-center px-7 py-3 xl:w-1/4 xl:flex-col-reverse xl:justify-center">
          <span className="w-34 bg-secondary p-2 rounded-[9px] font-medium text-center xl:text-[16px] xl:font-medium xl:mt-3 xl:w-43.75">
            اطلاعات بیشتر
          </span>

          <div className="flex items-center gap-2">
            <p className="text-secondary font-bold text-[20px] xl:text-[28px]">
              <span>{e2p("021")}</span>
              <span>-</span>
              <span>{e2p("1840")}</span>
            </p>
            <CallIcon className="size-5 text-[#282828] xl:size-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
