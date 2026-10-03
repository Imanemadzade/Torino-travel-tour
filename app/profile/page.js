"use client";

import { useGetUserData } from "@/service/queries";
import UserAccountInformationBox from "@/template/Profile/UserAccountInformationBox.js";
import BankAccountInformationBox from "@/template/Profile/BankAccountInformationBox";
import PersonalInformationBox from "@/template/Profile/PersonalInformationBox";
import Loader from "components/common/Loader";

function ProfilePage() {
  const { data, isPending } = useGetUserData();
  if (isPending)
    <Loader
      className="w-full h-full flex justify-center items-center "
      width="50px"
      height="50px"
      color="#28A745"
    />;
  return (
    <div className="flex flex-col gap-5 lg:mt-9.25">
      <UserAccountInformationBox
        data={data?.data}
        className="px-5 py-4 border border-[#00000033] rounded-[10px]"
      />
      <PersonalInformationBox
        data={data?.data}
        className="px-5 py-4 border border-[#00000033] rounded-[10px]"
      />
      <BankAccountInformationBox
        data={data?.data}
        className="px-5 py-4 border border-[#00000033] rounded-[10px] "
      />
    </div>
  );
}

export default ProfilePage;
