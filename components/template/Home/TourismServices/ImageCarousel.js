"use client";

import { TOURISM_PICS } from "@/constans/tourismServicesPics";
import LineArrowRight from "@/icons/LineArrowRight";
import { e2p } from "core/utils/replaceNumber";
import Image from "next/image";
import { useState } from "react";

const NEXT = 1;
const PREVIOUS = -1;

// Original pixel layout (stage 334x284) expressed as % of the stage.
const SLOT_CLASSES = [
  "right-0 top-0 z-40 h-full w-[76.35%]",
  "right-[10.18%] top-[6.69%] z-30 h-[86.97%] w-[75.75%]",
  "right-[43.41%] top-[15.14%] z-20 h-[69.72%] w-[50.3%]",
  "right-[57.49%] top-[21.48%] z-10 h-[57.04%] w-[42.51%]",
];
const HIDDEN_SLOT = "pointer-events-none opacity-0";

function ImageCarousel({ className = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = TOURISM_PICS.length;

  const move = (step) =>
    setActiveIndex((prev) => (prev + step + total) % total);

  return (
    <div className={`w-full ${className}`}>
      <div className="relative aspect-334/284 w-full max-w-xl mx-auto">
        {TOURISM_PICS.map(({ id, image, alt }, index) => {
          const slot = (index + activeIndex) % total;
          return (
            <Image
              key={id}
              src={image}
              alt={alt}
              width={255}
              height={284}
              className={`absolute ${
                SLOT_CLASSES[slot] ?? HIDDEN_SLOT
              } transition-[width,height,top,right] duration-400 ease-linear motion-reduce:transition-none`}
            />
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-6.5 font-vazir text-base font-medium text-secondary sm:text-xl">
        <button type="button" onClick={() => move(NEXT)} aria-label="بعدی">
          <LineArrowRight className="size-6" />
        </button>

        <div className="flex flex-row-reverse gap-2" aria-live="polite">
          <span>{e2p(activeIndex + 1)}</span>
          <span>/</span>
          <span>{e2p(total)}</span>
        </div>

        <button type="button" onClick={() => move(PREVIOUS)} aria-label="قبلی">
          <LineArrowRight className="size-6 rotate-180 text-[#10411B50]" />
        </button>
      </div>
    </div>
  );
}

export default ImageCarousel;
