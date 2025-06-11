import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/appwrite/actions/file.actions";
import { Models } from "node-appwrite";
import React from "react";

const page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const files = await getFiles();
  return (
    <div className="page-container mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="mt-4 flex justify-between items-center w-full">
          <p className="text-3xl font-semibold">
            Total: <span className="text-[#9a6efe]">0 MB</span>
          </p>
          <div className="sort-container flex gap-2 font-bold ">
            <p className="body-1 hidden text-amber-50 sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>
      {files.total > 0 ? (
        <section className="file-list grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list body-1 mt-10 text-center text-light-200">
          No files Uploaded yet
        </p>
      )}
    </div>
  );
};

export default page;
