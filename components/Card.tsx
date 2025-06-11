import Link from "next/link";
import { Models } from "node-appwrite";
import React from "react";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import ForamttedDateTime from "./ForamttedDateTime";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="file-card flex cursor-pointer flex-col gap-6 rounded-[18px] bg-white text-black p-5 shadow-sm transition-all hover:shadow-drop-3"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          className="!size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          Actiondd
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>
      <div className="file-card-details flex flex-col gap-2 text-light-100">
        <p className="font-semibold line-clamp-1">{file.name}</p>
        <ForamttedDateTime
          date={file.$updatedAt}
          className="body-2 text-light-100"
        />
        <p className="line-clamp-1 text-[12px] leading-[16px] font-normal text-gray-600 text-sm">
            By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};

export default Card;
