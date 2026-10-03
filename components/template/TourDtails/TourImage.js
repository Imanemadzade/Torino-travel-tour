import Image from "next/image";

function TourImage({ image, name, className }) {
  return (
    <div className={`${className} mb-4`}>
      <Image
        src={image}
        width={1200}
        height={900}
        alt={`${name} picture`}
        className=" aspect-ratio-4/3 object-cover   rounded-xl  "
      />
    </div>
  );
}

export default TourImage;
