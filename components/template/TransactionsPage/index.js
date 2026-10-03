import { toJalaliDateString, toTime } from "core/utils/DateFn";
import { e2p } from "core/utils/replaceNumber";

function TransacionsPage({ amount, createdAt }) {
  const payDate = e2p(toJalaliDateString(createdAt));
  const payTime = toTime(createdAt);
  return (
    <tr>
      <td className="py-3.5 pr-3 md:py-5 md:pr-3.75 ">
        <div className=" flex-row-reverse gap-px">
          <span>{payDate}</span>
          <span>-</span>
          <span>{payTime}</span>
        </div>
      </td>
      <td className="py-3.5 md:py-5 text-center">{e2p(amount)}</td>
      <td className="py-3.5 md:py-5 text-center hidden md:table-cell">
        ثبت نام در تور گردشگری
      </td>
      <td className="py-3.5 md:py-5 text-center">{e2p(1052934)}</td>
    </tr>
  );
}

export default TransacionsPage;
