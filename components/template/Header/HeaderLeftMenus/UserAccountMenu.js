import { useEffect, useRef, useState } from "react";
import { removeCookie } from "core/utils/cookie";

import { e2p } from "core/utils/replaceNumber";
import ProfileIcon from "@/icons/ProfileIcon";
import ArrowDownIcon from "@/icons/ArrowDownIcon";
import { useRouter } from "next/navigation";
import ExitUserAccountIcon from "@/icons/ExitUserAccountIcon";
import { useQueryClient } from "@tanstack/react-query";

function UserAccountMenu({
  data: {
    data: { mobile },
  },
}) {
  const [isOpenDash, setIsOpenDash] = useState(false);
  const queryClient = useQueryClient();

  const router = useRouter();
  const openDashRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (openDashRef.current.contains(e.target)) return;
      setIsOpenDash(false);
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const exitHandler = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    queryClient.removeQueries(["user-data"]);
    setIsOpenDash(false);
    router.push("/");
  };
  const profileHandler = () => {
    router.push("/profile");
    setIsOpenDash(false);
  };

  return (
    <div
      className="w-36.5 relative flex justify-center items-center place-items-center gap-1 text-[#28A745] text-sm font-medium select-none md:w-45 "
      onClick={() => setIsOpenDash(!isOpenDash)}
      ref={openDashRef}
    >
      <ProfileIcon className="size-3.5" />
      <span> {e2p(mobile)}</span>
      <span className="size-4 hover:bg-green-200 hover:rounded-full cursor-pointer ">
        <ArrowDownIcon />
      </span>

      {isOpenDash && (
        <div className="z-10 absolute top-13 -left-[5.5px]  w-39.25   text-[12px] rounded-[11px] bg-[#ffffff] md:w-61.5 md:h-37.75 md:text-[14px] md:font-normal md:gap-2 md:-left-8.25 shadow-[0_1px_4px_#00000016]">
          <div className="bg-[#F4F4F4] text-[14px] rounded-t-[11px] h-11 flex justify-center  items-center gap-3 md:justify-start md:pr-4.5 md:text-[16px] md:font-semibold  ">
            <span className="w-7 h-7  bg-[#D9D9D9] rounded-full flex justify-center items-center ">
              <ProfileIcon className="size-4 md:size-5" />
            </span>
            <span className="text-[#10411B] font-[14px]">{e2p(mobile)}</span>
          </div>

          <div className="h-9.25 flex gap-2 justify-center items-center md:h-13.75 md:pr-5.5 md:justify-start text-[#282828] hover:bg-gray-200">
            <ProfileIcon className="[--icon-stroke:#282828] text-white size-4 md:size-5  " />
            <button onClick={profileHandler}>اطلاعات حساب کاربری</button>
          </div>

          <div className="h-9.25 gap-2 text-[#D40000] flex justify-center  items-center border-t border-[#0000001F] hover:bg-gray-200 md:pr-5.5 md:justify-start">
            <ExitUserAccountIcon className="size-4 md:size-5" />

            <button onClick={exitHandler}>خروج از حساب کاربری</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAccountMenu;
