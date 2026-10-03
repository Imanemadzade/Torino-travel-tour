"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { TABS_DATA } from "@/constans/sideBarTabs";

function SideBar({ className }) {
  const pathName = usePathname();
  const filteredPathName = TABS_DATA.filter(
    (tab) => pathName === tab.href || pathName.startsWith(`${tab.href}/`)
  );

  const activeTab = filteredPathName.reduce((previousTab, currentTab) => {
    if (previousTab === null) return currentTab;
    return currentTab.href.length > previousTab.href.length
      ? currentTab
      : previousTab;
  }, null);
  const finalTab = activeTab ?? TABS_DATA.find((tab) => tab.href === pathName);

  return (
    <div className={className}>
      <ul className="flex  text-xs font-normal justify-between lg:flex-col lg:w-40 xl:w-71  lg:text-[14px]  lg:border lg:border-[#00000033] lg:rounded-[10px] lg:overflow-hidden lg:mt-9 lg:mr-0  lg:divide-y lg:divide-[#00000033] 2xl:mr-12.75  ">
        {TABS_DATA.map((tab) => (
          <li key={tab.id}>
            <Link
              href={tab.href}
              className={`flex align-middle gap-2 px-2 py-2 lg:h-14.5  lg:place-items-center ${
                tab.href === finalTab.href
                  ? "text-[#28A745] border-b border-[#28A745]  lg:border-none lg:bg-[#28A74540] transition duration-200 ease-in-out"
                  : null
              } `}
            >
              <span>
                <tab.name className="size-4 sm:size-5" />
              </span>
              <p className="sm:text-[16px]">{tab.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
