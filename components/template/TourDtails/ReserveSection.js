import ReserveButton from "components/atoms/ReserveButton";
import { spNum } from "core/utils/replaceNumber";

function ReserveSection({ className, price, id }) {
  return (
    <div
      className={`${className} mt-8 text-[#282828B2]  flex justify-between items-baseline `}
    >
      <ReserveButton id={id} />
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
  );
}

export default ReserveSection;
