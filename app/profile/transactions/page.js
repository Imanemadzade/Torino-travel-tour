"use client";

import { useGetUserTransactions } from "@/service/queries";
import TransacionsPage from "@/template/TransactionsPage";
import Loader from "components/common/Loader";

function Transactions() {
  const { data, isPending } = useGetUserTransactions();
  if (isPending)
    return (
      <Loader
        className="w-full h-full flex justify-center items-center "
        width="50px"
        height="50px"
        color="#28A745"
      />
    );
  if (!data?.data?.length)
    return (
      <p className="bg-[#28A74540] h-14 rounded-sm text-[#28A745] flex justify-center items-center size-full mt-9 text-center ">
        تراکنشی برای نمایش وجود ندارد.
      </p>
    );
  return (
    <div className="border border-[#00000025] rounded-[10px] overflow-hidden lg:mt-9">
      <table className="w-full text-[12px] font-light">
        <thead className="h-full bg-[#DBDBDB]">
          <tr>
            <th className="pt-2.25 pb-4.25 pr-3 md:py-3.75 md:pr-3.75 text-start">تاریخ و ساعت</th>
            <th className="pt-2.25 pb-4.25 md:py-3.75 text-center">مبلغ(تومان)</th>
            <th className="pt-2.25 pb-4.25 md:py-3.75 text-center hidden md:table-cell">نوع تراکنش</th>
            <th className="pt-2.25 pb-4.25 md:py-3.75 text-center">شماره سفارش</th>
          </tr>
        </thead>

        <tbody className="bg-white ">
          {data?.data.map((transaction) => (
            <TransacionsPage key={transaction.id} {...transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
