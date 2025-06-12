"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";
import { sortTypes } from "@/app/constants";

const Sort = () => {
  const router = useRouter();
  const path = usePathname();

  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  };

  return (
    <div className="w-fit">
      <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
        <SelectTrigger className="w-[180px] rounded-full border border-[#444] bg-[#1f1f1f] text-white shadow-sm hover:border-[#9a6efe] transition-all duration-200">
          <SelectValue placeholder={sortTypes[0].value} />
        </SelectTrigger>

        <SelectContent className="bg-[#2a2a2a] text-white border border-[#444] shadow-lg rounded-xl">
          {sortTypes.map((sort) => (
            <SelectItem
              key={sort.label}
              value={sort.value}
              className="cursor-pointer hover:bg-[#3b3b3b] px-3 py-2 rounded-md transition-all duration-150 focus:bg-[#9a6efe]/20 focus:text-[#9a6efe]"
            >
              {sort.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
