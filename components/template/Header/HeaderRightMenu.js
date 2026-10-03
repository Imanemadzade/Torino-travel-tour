import HamburgerMenuIcon from "@/icons/HamburgerMenuIcon";
import { MENUS } from "@/constans/headerMenus";
import Image from "next/image";
import Link from "next/link";

function HeaderRightMenu() {
  return (
    <div>
      <div className="lg:hidden">
        <span className="w-7.5">
          <HamburgerMenuIcon className="text-secondary w-5 h-4" />
        </span>
      </div>
      <div className="flex items-center space-between gap-7.5 max-lg:hidden">
        <span>
          <Image
            src="/images/torino-logo.webp"
            width={300}
            height={300}
            alt="لوگو تورینو"
            className="w-46.5 h-11"
          />
        </span>
        <ul className="flex space-between gap-5 font-medium">
          {MENUS.map((menu) => (
            <li key={menu.id}>
              <Link href={`${menu.href}`}>{menu.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HeaderRightMenu;
