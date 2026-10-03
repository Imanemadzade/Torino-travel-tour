import ProfileIcon from "@/icons/ProfileIcon";
import SunFogIcon from "@/icons/SunFogIcon";
import TransactionsIcon from "@/icons/TransactionsIcon";

const TABS_DATA = [
  {
    id: 1,
    title: "پروفایل من",
    href: "/profile",
    name: ProfileIcon,
  },
  {
    id: 2,
    title: " تورهای من",
    href: "/profile/my-tours",
    name: SunFogIcon,
  },
  {
    id: 3,
    title: "تراکنش ها",
    href: "/profile/transactions",
    name: TransactionsIcon,
  },
];

export { TABS_DATA };
