"use client";

import { NavbarContent, NavbarItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { text: "Chats", href: "/chat", auth: true },
  { text: "Search Users", href: "/search-users", auth: true },
];

const NavLinks = () => {
  const path = usePathname();
  const { status } = useSession();

  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem className={path === "/" ? "text-primary" : undefined}>
        <Link color="foreground" href="/">
          Home
        </Link>
      </NavbarItem>
      {links.map(
        link =>
          (!link.auth || (link.auth && status === "authenticated")) && (
            <NavbarItem
              key={link.text}
              className={path.startsWith(link.href) ? "text-primary" : undefined}
            >
              <Link color="foreground" href={link.href}>
                {link.text}
              </Link>
            </NavbarItem>
          )
      )}
    </NavbarContent>
  );
};

export default NavLinks;
