import Image from "next/image";
import { FEATURES } from "@/constans/features";

function FeatureItem({ title, description, icon }) {
  return (
    <li className="flex items-start gap-3 sm:gap-4">
      <Image
        src={icon}
        alt=""
        width={96}
        height={96}
        className="size-16 shrink-0 sm:size-20 lg:size-24"
      />

      <div className="min-w-0">
        <h3 className="text-lg font-bold text-neutral-900 sm:text-xl lg:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-7 text-neutral-700 sm:text-base lg:text-lg lg:leading-8">
          {description}
        </p>
      </div>
    </li>
  );
}

function Features({ className = "" }) {
  return (
    <section
      id="about-us"
      aria-label="مزایای تورینو"
      className={`w-full ${className}`}
    >
      <ul className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-3 lg:gap-6">
        {FEATURES.map(({ id, ...feature }) => (
          <FeatureItem key={id} {...feature} />
        ))}
      </ul>
    </section>
  );
}

export default Features;
