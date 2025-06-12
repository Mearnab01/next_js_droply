"use client";

import React, { useState } from "react";
import { Loader, LogOut } from "lucide-react";
import Search from "./Search";
import FileUploder from "./FileUploder";
import { signOutUser } from "@/lib/appwrite/actions/user.actions";
import { useRouter } from "next/navigation";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOutUser();
      router.push("/sign-in");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="header hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10">
      <Search />

      <div className="header-wrapper flex items-center min-w-fit gap-4">
        {/* File Uploader */}
        <div className=" rounded-full transition-all duration-300 hover:shadow-[0_0_10px_4px_#9a6efe80]">
          <FileUploder ownerId={userId} accountId={accountId} />
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="rounded-full bg-[#9a6efe] px-10 py-3 transition-all duration-300 cursor-pointer hover:shadow-[0_0_10px_4px_#9a6efe80] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader className="h-4 w-4 animate-spin text-white" />
          ) : (
            <div className="flex items-center min-w-fit gap-2 text-white button">
              <LogOut className="text-white" /> <p>Logout</p>
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
