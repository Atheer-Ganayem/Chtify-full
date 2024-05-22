"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import UserSettings from "../user-settings/UserSettings";

interface Props {
  user: {
    name: string;
    email: string;
    id: string;
    avatar: string;
  };
}

const AvatarDropdown: React.FC<Props> = ({ user }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={`${process.env.AWS}${user.avatar}`}
            color="primary"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">{user.name}</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
          <DropdownItem key="settings" onPress={onOpen}>
            Settings
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            className="text-danger"
            onClick={() => signOut({ callbackUrl: "/auth", redirect: true })}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <UserSettings isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default AvatarDropdown;
