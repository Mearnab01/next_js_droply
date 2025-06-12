"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/appwrite/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import ForamttedDateTime from "./ForamttedDateTime";
import { useDebounce } from "use-debounce";

const Search = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 500);
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const searchQuery = searchParams.get("query") || "";
  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchFiles = async () => {
      // if (!query) {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.documents);
      setOpen(true);
    };
    fetchFiles();
  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };
  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);
    router.push(
      `${
        file.type === "video" || file.type === "audio"
          ? "media"
          : file.type + "s"
      }?query=${query}`
    );
  };
  const clearSearch = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <div className="relative w-full max-w-lg shadow-md">
      <SearchIcon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
        size={18}
      />
      <Input
        type="text"
        placeholder="Search files, users..."
        value={query}
        onChange={handleInputChange}
        className="pl-10 pr-10 py-2 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#9a6efe] transition"
      />
      {open && (
        <ul className="absolute left-0 top-16 z-50 w-full flex flex-col gap-3 rounded-2xl p-4 bg-gradient-to-r from-[#3a3a3a] to-[#1e1e1e] shadow-md shadow-[#9a6efe]/30 border border-[#444] max-h-80 overflow-y-auto backdrop-blur-md">
          {results.length > 0 ? (
            results.map((file) => (
              <li
                key={file.$id}
                onClick={() => handleClickItem(file)}
                className="flex flex-col gap-1 p-2 rounded-lg hover:bg-[#2a2a2a] transition duration-200 cursor-pointer"
              >
                <div className="flex justify-between items-center gap-4">
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                    className="size-9 min-w-9 rounded-md object-cover"
                  />
                  <p className="line-clamp-1 text-white text-sm font-medium">
                    {file.name}
                  </p>
                  <ForamttedDateTime
                    date={file.$createdAt}
                    className="text-xs text-gray-400"
                  />
                </div>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-400 px-2 py-1">No files found</p>
          )}
        </ul>
      )}

      {query && (
        <X
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          size={18}
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default Search;
