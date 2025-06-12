import { Models } from "node-appwrite";
import React from "react";
import Thumbnail from "./Thumbnail";
import ForamttedDateTime from "./ForamttedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

// 💠 Thumbnail Section with neon glow
const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="flex items-center gap-4 bg-gradient-to-br from-[#1a1a1a] to-[#222] p-4 rounded-xl border border-[#2f2f2f] shadow-[0_0_10px_#4b3ad6] transition-all duration-300">
    <Thumbnail
      type={file.type}
      extension={file.extension}
      url={file.url}
      className="!size-16"
      imageClassName="!size-12"
    />
    <div className="flex flex-col text-white">
      <p className="font-semibold text-lg text-white/90 group-hover:text-purple-300 transition-colors duration-200 line-clamp-1">
        {file.name}
      </p>
      <ForamttedDateTime
        date={file.$createdAt}
        className="text-xs text-gray-400"
      />
    </div>
  </div>
);

// 🟪 Detail Row With glow labels
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center px-3 py-2 text-sm text-white/90 border-b border-[#333] last:border-none">
    <p className="font-medium text-purple-400">{label}</p>
    <p className="truncate text-sm text-white">{value}</p>
  </div>
);

// 📄 File Details Card
export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <div className="flex flex-col gap-4 mt-6 p-5 rounded-2xl bg-[#121212] border border-[#292929] text-white shadow-[0_0_15px_#27272a]">
      <ImageThumbnail file={file} />
      <div className="mt-4 flex flex-col divide-y divide-[#2a2a2a] rounded-xl overflow-hidden bg-[#1a1a1a] shadow-inner">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.owner.fullName} />
        <DetailRow
          label="Last Update:"
          value={formatDateTime(file.$updatedAt)}
        />
      </div>
    </div>
  );
};

// 🚀 Share Input UI with modern glow + animation
interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="mt-4 bg-[#1a1a1a] p-4 rounded-2xl border border-[#2e2e2e] shadow-[0_0_12px_#3f3f46]">
        <p className="text-white/80 text-sm mb-2">🔗 Share to other users:</p>
        <Input
          type="email"
          placeholder="Enter email(s), comma-separated"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="bg-[#2a2a2a] text-white placeholder:text-gray-400 border border-[#3b3b3b] focus:border-purple-400 focus:ring-purple-400 rounded-md px-4 py-2 mb-4 transition-all duration-300"
        />

        <div className="pt-2">
          <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
            <p className="font-medium">👥 Shared With:</p>
            <p>
              {file.users.length} user{file.users.length !== 1 && "s"}
            </p>
          </div>

          <ul className="space-y-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex justify-between items-center px-3 py-2 bg-[#262626] rounded-md hover:bg-[#333] transition"
              >
                <p className="text-white text-sm truncate">{email}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(email)}
                  className="hover:bg-red-500/20 p-1 rounded-full"
                >
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={18}
                    height={18}
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
