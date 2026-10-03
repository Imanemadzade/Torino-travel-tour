"use client";

import { useGetUserTours } from "@/service/queries";
import MyToursPage from "@/template/MyToursPage";
import Loader from "components/common/Loader";

function MyTours() {
  const { data, isPending } = useGetUserTours();

  if (isPending)
    return (
      <Loader
        className="w-full h-full flex justify-center items-center "
        width="50px"
        height="50px"
        color="#28A745"
      />
    );
  if (data?.data?.length === 0)
    return (
      <p className="bg-[#28A74540] h-14 rounded-sm text-[#28A745] flex justify-center items-center size-full mt-9 text-center ">
        توری برای نمایش وجود ندارد.
      </p>
    );
  return (
    <>
      {data?.data.map((tour) => (
        <MyToursPage key={tour.id} tour={tour} />
      ))}
    </>
  );
}

export default MyTours;
