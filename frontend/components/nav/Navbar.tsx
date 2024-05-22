"use client";

import React from "react";
import {
  Navbar as NextNav,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import NavLinks from "./NavLinks";
import SideLinks from "./SideLinks";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { status } = useSession();

  const menuItems = [
    { text: "Home", href: "/", auth: false },
    { text: "Chats", href: "/chat", auth: true },
    { text: "Search Users", href: "/search-users", auth: true },
  ];

  return (
    <NextNav onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link className="gap-3 flex items-center" href="/">
          <Image src="/logo.png" width={50} height={50} alt="logo" />
          <p className="font-bold text-primary text-2xl">Chatify</p>
        </Link>
      </NavbarContent>
      <NavLinks />
      <SideLinks />
      <NavbarMenu>
        {menuItems.map(
          (item, index) =>
            (!item.auth || (item.auth && status === "authenticated")) && (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  className="w-full"
                  href={item.href}
                >
                  {item.text}
                </Link>
              </NavbarMenuItem>
            )
        )}
      </NavbarMenu>
    </NextNav>
  );
};

export default Navbar;
