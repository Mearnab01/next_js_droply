import Link from "next/link";
import { Models } from "node-appwrite";
import React from "react";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import ForamttedDateTime from "./ForamttedDateTime";
import ActionDropdown from "./ActionDropdown";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="group file-card flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#101010] text-white p-6 border border-[#2e2e2e] shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_#915EFF] hover:scale-[1.03]"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20 group-hover:brightness-110 group-hover:scale-105 transition-transform duration-200"
          imageClassName="!size-12"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="text-xs text-gray-400 font-medium mt-2">
            {convertFileSize(file.size)}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="file-card-details flex flex-col gap-2 text-left">
        <p className="font-semibold text-base line-clamp-1 text-white group-hover:text-[#b794f4] transition-colors duration-200">
          {file.name}
        </p>
        <ForamttedDateTime
          date={file.$updatedAt}
          className="text-[13px] text-zinc-500"
        />
        <p className="line-clamp-1 text-[12px] font-light text-gray-500 italic">
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};

export default Card;
