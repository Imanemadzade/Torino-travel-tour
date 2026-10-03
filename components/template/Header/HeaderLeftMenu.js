"use client";
import { useState, useCallback, useEffect } from "react";
import AuthForm from "../AuthForm";
import { useGetUserData } from "@/service/queries";
import UserAccountMenu from "./HeaderLeftMenus/UserAccountMenu";
import ProfileIcon from "@/icons/ProfileIcon";
import MobileSigninIcon from "@/icons/HeaderIcons/MobileSigninIcon";

function HeaderLeftMenu() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: user } = useGetUserData();

  useEffect(() => {
    setIsOpenModal(true);
  }, []);

  const openAuthModal = useCallback(() => setIsOpenModal(true), []);

  if (user?.data) return <UserAccountMenu data={user} />;

  return (
    <div>
      <button
        type="button"
        className="cursor-pointer md:hidden"
        onClick={openAuthModal}
      >
        <MobileSigninIcon className="size-10 text-primary" />
      </button>

      <div className="font-vazir text-[18px] hidden md:block ]">
        <button
          type="button"
          className="p-2 flex items-center justify-baseline text-primary border-2 border-primary rounded-lg cursor-pointer"
          onClick={openAuthModal}
        >
          <ProfileIcon className="size-5 text-primary" />
          <span className="px-1 hover:text-primary-dark hover:bg-gray-200 hover:rounded-[5px]">
            ورود
          </span>
          <span className="mx-1 bg-primary w-px h-5 "></span>
          <span className="px-1 hover:text-primary-dark hover:bg-gray-200 hover:rounded-[5px]">
            ثبت نام
          </span>
        </button>
      </div>
      <AuthForm isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </div>
  );
}

export default HeaderLeftMenu;
