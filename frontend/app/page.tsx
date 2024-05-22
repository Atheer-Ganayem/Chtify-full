"use client";

import { TypewriterEffectSmooth } from "@/components/UI/typewriter-effect";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
// import Image from "next/image";

export default function Home() {
  const { status } = useSession();

  const words = [
    {
      text: "Connect,",
    },
    {
      text: "Share,",
    },
    {
      text: "and ",
    },
    {
      text: "Chat ",
    },
    {
      text: "with ",
    },
    {
      text: "Chatify.",
      className: "dark:text-primary text-primary",
    },
  ];
  return (
    <>
      {/* <Image src="/logo.png" alt="logo" width={300} height={300} /> */}

      <div className="flex flex-col items-center justify-center h-[40rem]">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
          The future of communication starts here
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          {status === "unauthenticated" && (
            <>
              <Button
                color="default"
                variant="ghost"
                className="w-40"
                as={Link}
                href="/auth?mode=login"
              >
                Login
              </Button>
              <Button color="primary" className="w-40" as={Link} href="/auth?mode=signup">
                Signup
              </Button>
            </>
          )}
          {status === "authenticated" && (
            <Button color="primary" className="w-40" as={Link} href="/chat">
              Start Chatting
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
