import ActionDropdown from "@/components/ActionDropdown";
import Chart from "@/components/Chart";
import ForamttedDateTime from "@/components/ForamttedDateTime";
import Thumbnail from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import {
  getFiles,
  getTotalSpaceUsed,
} from "@/lib/appwrite/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";
import React from "react";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);
  const useageSummary = getUsageSummary(totalSpace);
  return (
    <div className="dashboard-container px-4 md:px-10 py-6 space-y-12 bg-gradient-to-tr from-[#1c1c24] to-[#0e0e13] min-h-screen text-white">
      <section className="w-full flex justify-center">
        <Chart used={totalSpace.used} total={totalSpace.all} />
      </section>

      <section>
        <ul className="dashboard-summary-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card bg-[#121218] hover:scale-[1.02] transition-all duration-300 rounded-2xl p-6 border border-[#2a2a3b] shadow-md hover:shadow-purple-700/40"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  {/* ICON */}
                  <div className="w-14 h-14 rounded-full bg-[#2b2b3b]/60 backdrop-blur-md flex items-center justify-center border border-[#3f3f51]">
                    <Image
                      src={summary.icon}
                      width={28}
                      height={28}
                      alt="uploaded image"
                      className="object-contain"
                    />
                  </div>

                  {/* SIZE */}
                  <h4 className="text-xl font-bold text-purple-300 drop-shadow-[0_1px_5px_rgba(128,90,255,0.5)] text-end">
                    {convertFileSize(summary.size) || "0 B"}
                  </h4>
                </div>

                {/* TITLE */}
                <h5 className="text-lg font-semibold text-purple-300 drop-shadow-[0_1px_5px_rgba(128,90,255,0.5)]">
                  {summary.title}
                </h5>

                <Separator className="bg-gray-600 my-2" />

                {/* DATE */}
                <ForamttedDateTime
                  date={summary.latestDate}
                  className="text-sm text-muted-foreground text-center"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      {/* recent files uploaded */}
      <section className="dashboard-recent-files">
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-purple-500 pl-4">
          Recent Files Uploaded
        </h2>
        {files.documents.length > 0 ? (
          <ul className="flex flex-col gap-5 mt-5">
            {files.documents.map((file: Models.Document) => (
              <Link
                href={file.url}
                target="_blank"
                key={file.$id}
                className="flex items-center justify-between gap-4 p-4 bg-[#1f1f2e] rounded-xl hover:shadow-md hover:shadow-purple-500/30 transition"
              >
                <div className="flex items-center gap-4">
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                  />
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-100">{file.name}</p>
                    <ForamttedDateTime
                      date={file.$createdAt}
                      className="text-sm text-gray-400"
                    />
                  </div>
                </div>
                <ActionDropdown file={file} />
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground italic">No Files Uploaded yet</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
