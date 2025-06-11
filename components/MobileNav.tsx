"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navItems } from "@/app/constants";
import { signOutUser } from "@/lib/appwrite/actions/user.actions";
import { FileBox } from "lucide-react";
import FileUploder from "./FileUploder";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNav = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header flex h-[60px] justify-between px-5 sm:hidden">
      <Link href="/" className="flex items-center gap-3 group relative">
        {/* logo hover effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
        <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
          <FileBox className="w-8 h-8 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
        </div>
        <div className="relative">
          <span className="text-3xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text block">
            Droply
          </span>
        </div>
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Menu"
            width={30}
            height={30}
            className="cursor-pointer invert dark:invert-0 transition-all hover:scale-110"
          />
        </SheetTrigger>
        <SheetContent className="dark-sheet bg-gray-900 border-l border-gray-800 pt-0 h-screen px-3 overflow-y-auto">
          {/* Glow effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />

          <SheetTitle>
            <div className="header-user my-3 flex items-center gap-3 rounded-xl p-2 bg-gray-800/80 backdrop-blur-sm">
              <div className="relative">
                <Image
                  src={avatar}
                  alt="avatar"
                  width={44}
                  height={44}
                  className="aspect-square w-10 rounded-full object-cover ring-2 ring-purple-500/50"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
              </div>
              <div>
                <p className="font-medium text-white capitalize">{fullName}</p>
                <p className="text-sm text-gray-400">{email}</p>
              </div>
            </div>
            <Separator className="my-4 bg-gray-700" />
          </SheetTitle>

          <nav className="mobile-nav h5 flex-1 gap-1 text-[#9a6efe]">
            <ul className="flex flex-col gap-2">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} onClick={() => setOpen(false)}>
                  <li
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-lg text-white transition-all",
                      "hover:bg-gray-800 hover:shadow-lg hover:shadow-purple-500/10",
                      pathname === url
                        ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-l-4 border-purple-500"
                        : "text-gray-300"
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "transition-all duration-200",
                        pathname === url
                          ? "brightness-200 drop-shadow-lg"
                          : "opacity-50"
                      )}
                    />
                    <span className="font-medium">{name}</span>
                    {pathname === url && (
                      <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    )}
                  </li>
                </Link>
              ))}
            </ul>
            <div className="mt-5">
              <FileUploder ownerId={ownerId} accountId={accountId}/>
            </div>
          </nav>

          <Separator className="my-5 bg-gray-700" />

          <div className="flex flex-col gap-3 pb-5">
            <Button
              onClick={async () => await signOutUser()}
              className="logout-button group flex items-center gap-3 bg-gray-800 hover:bg-red-900/80 transition-all"
            >
              <div className="relative">
                <Image
                  src="/assets/icons/logout.svg"
                  alt="logout"
                  width={20}
                  height={20}
                  className="invert group-hover:animate-shake"
                />
              </div>
              <span className="text-white font-medium">Sign Out</span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  className="text-red-500"
                >
                  <path
                    d="M5 1C5 0.447715 5.44772 0 6 0H9C9.55228 0 10 0.447715 10 1V2H14C14.5523 2 15 2.44772 15 3V13C15 13.5523 14.5523 14 14 14H1C0.447715 14 0 13.5523 0 13V3C0 2.44772 0.447715 2 1 2H5V1ZM9 1H6V2H9V1ZM1 3V13H14V3H1Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNav;
