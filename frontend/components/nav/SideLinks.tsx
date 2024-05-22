import { Button, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import ThemeChangerDropDown from "../UI/ThemeChangerDropDown";
import { useSession } from "next-auth/react";
import AvatarDropdown from "./AvatarDropdown";

const SideLinks = () => {
  const { data: session, status } = useSession();

  return (
    <NavbarContent justify="end">
      {status !== "loading" &&
        (!session ? (
          <>
            <NavbarItem>
              <Button as={Link} color="primary" href="/auth?mode=login" variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden lg:block">
              <Button as={Link} color="primary" href="/auth?mode=signup" variant="solid">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <AvatarDropdown user={session.user} />
        ))}
      <NavbarItem>
        <ThemeChangerDropDown />
      </NavbarItem>
    </NavbarContent>
  );
};

export default SideLinks;
