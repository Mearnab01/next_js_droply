"use client";
import { avatarPlaceholderUrl, navItems } from "@/app/constants";
import { cn } from "@/lib/utils";
import { FileBox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  fullName: string;
  email: string;
  avatar: string;
}
const Sidebar = ({ fullName, email, avatar }: Props) => {
  const pathname = usePathname();
  return (
    <aside className="sidebar bg-gradient-to-r from-black via-[#0e0e0e] to-transparent remove-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px] border-r border-[#1f1f1f] shadow-[6px_0_12px_rgba(0,0,0,0.3)]">
      <Link href="/" className="flex items-center gap-3 group relative">
        {/* logo hover effect */}
        <div
          className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
        />
        <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
          <FileBox className="w-8 h-8 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
        </div>
        <div className="relative">
          <span
            className="text-3xl font-semibold bg-gradient-to-r
                 from-blue-400 to-purple-400 text-transparent bg-clip-text hidden lg:block"
          >
            Droply
          </span>
        </div>
      </Link>
      <nav className="sidebar-nav text-[16px] leading-[24px] font-semibold mt-9 flex-1 gap-1">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item flex text-gray-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center text-[16px] leading-[24px] font-semibold lg:px-[30px] h-[52px] lg:rounded-full hover:scale-105 transition-all duration-200",
                  pathname === url &&
                    "shad-active bg-[#9a6efe] text-white shadow-drop-2"
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon w-6 filter opacity-30 transition-all duration-200",
                    pathname === url && "nav-icon-active invert-0 opacity-100"
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src="/assets/images/files-2.png"
        alt="logo"
        width={300}
        height={300}
        className="w-full h-auto hover:rotate-6 transition-transform duration-500 cursor-pointer"
      />
      <div className="sidebar-user-info mt-4 flex items-center justify-center gap-2 rounded-full bg-[#9a6efe]/10 p-1 text-light-100 lg:justify-start lg:p-3">
        <Image
          src={avatar || avatarPlaceholderUrl}
          alt="user avatar"
          width={50}
          height={50}
          className="rounded-full border-2 border-purple-500 mb-2"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
