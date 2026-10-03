import { FOOTER_LINKS_GROUPS } from "@/constans/footerLinksData";
import Link from "next/link";

function FooterLinks() {
  return (
    <nav className="flex justify-between text-[#282828] md:gap-25">
      {FOOTER_LINKS_GROUPS.map((group) => (
        <section key={group.id}>
          <h3 className="text-[22px] font-semibold mb-5 md:text-[24px] ">{group.title}</h3>
          <ul>
            {group.links.map((item) => (
              <li key={item.id} className="mb-2.75 text-[16px] font-normal md:text-[18px]">
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}

export default FooterLinks;
