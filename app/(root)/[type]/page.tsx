import Card from "@/components/Card";
import Sort from "@/components/Sort";
import {
  getFiles,
  getTotalSpaceUsed,
} from "@/lib/appwrite/actions/file.actions";
import {
  convertFileSize,
  getEmoji,
  getFileTypesParams,
  getUsageSummary,
} from "@/lib/utils";
import { Models } from "node-appwrite";
import React from "react";

const page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });

  const totalSpace = await getTotalSpaceUsed();
  const usageSummary = getUsageSummary(totalSpace);
  const currentSummary = usageSummary.find(
    (summary) => summary.title.toLowerCase() === type.toLowerCase()
  );

  return (
    <div className="page-container mx-auto w-full max-w-7xl px-4 sm:px-8 py-10 flex flex-col gap-8 text-white">
      {/* Heading + Info */}
      <section className="w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold capitalize text-purple-300 drop-shadow-[0_1px_5px_rgba(128,90,255,0.5)]">
          {type}
        </h1>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <p className="text-xl sm:text-2xl font-medium text-white/80">
            {getEmoji(currentSummary?.title)} Total Size:{" "}
            <span className="text-[#9a6efe] font-bold">
              {" "}
              {convertFileSize(currentSummary?.size || 0)}
            </span>
          </p>
          <div className="sort-container flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-300">
            <p className="hidden sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>

      {/* Files Display */}
      {files.total > 0 ? (
        <section className="file-list grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <div className="w-full text-center mt-20 animate-fade-in">
          <p className="text-lg text-gray-400 font-medium">
            🚫 No files uploaded yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
