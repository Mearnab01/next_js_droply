"use client";

import { actionsDropdownItems } from "@/app/constants";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { constructDownloadUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  deleteFiles,
  renameFiles,
  updateFileUsers,
} from "@/lib/appwrite/actions/file.actions";
import { usePathname } from "next/navigation";

import { FileDetails, ShareInput } from "./ActionModalComponent";
import { toast } from "sonner";

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const path = usePathname();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
  };
  // handle action
  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);

    try {
      let success = false;
      const actions = {
        rename: () =>
          renameFiles({
            fileId: file.$id,
            name,
            extension: file.extension,
            path,
          }),
        share: () =>
          updateFileUsers({
            fileId: file.$id,
            emails,
            path,
          }),
        delete: () =>
          deleteFiles({
            fileId: file.$id,
            path,
            bucketFileId: file.bucketFileId,
          }),
      };

      const actionFn = actions[action.value as keyof typeof actions];
      success = await actionFn();

      if (success) {
        toast.success(
          action.value === "rename"
            ? `Renamed to "${name}"`
            : action.value === "share"
            ? `Shared with ${emails.join(", ")}`
            : action.value === "delete"
            ? `Deleted "${file.name}" successfully`
            : "Action cleared"
        );
        closeAllModals();
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error executing action.");
    } finally {
      setIsLoading(false);
    }
  };

  // handleRemove user
  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);
    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });
    if (success) {
      setEmails(updatedEmails);
      toast.success(`You removed ${email} to access ${file.name}`);
    }
    closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return null;
    const { label, value } = action;

    return (
      <DialogContent className="bg-[#1a1a1a] text-white border border-[#333] rounded-2xl w-[90%] max-w-[400px] px-6 py-8 shadow-xl">
        <DialogHeader className="flex flex-col gap-3 text-[#9a6efe]">
          <DialogTitle className="text-center text-lg font-semibold">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#2a2a2a] text-white border border-[#444]"
            />
          )}

          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === "delete" && (
            <p className="text-sm leading-6 text-white">
              This action can&apos;t be undone.{" "}
              <span className="font-semibold text-red-400">
                {file.owner?.fullName}
              </span>
              , are you sure you want to delete{" "}
              <span className="font-semibold text-red-400">{file.name}</span>?
            </p>
          )}
        </DialogHeader>

        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row justify-end">
            <Button
              variant="ghost"
              className="bg-[#2c2c2c] text-white hover:bg-[#444]"
              onClick={closeAllModals}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              className="bg-[#9a6efe] hover:bg-[#7b4de1] text-white"
            >
              <p className="capitalize">{value}</p>
            </Button>
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                className="animate-spin"
                width={24}
                height={24}
              />
            )}
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="outline-none hover:scale-105 transition-transform duration-200 ease-in-out">
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-[#1f1f1f] text-white border border-[#333] shadow-lg rounded-lg">
          <DropdownMenuLabel className="max-w-[200px] truncate text-[#9a6efe] font-semibold">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#333]" />

          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item flex items-center gap-3 hover:bg-[#292929] cursor-pointer px-3 py-2 rounded-md transition-all duration-200"
              onClick={() => {
                setAction(actionItem);
                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={24}
                    height={24}
                  />
                  <span>{actionItem.label}</span>
                </Link>
              ) : (
                <div className="flex items-center gap-3 transition-all duration-200 group">
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={24}
                    height={24}
                    className="group-hover:scale-110 transition-transform duration-200 ease-in-out"
                  />
                  <span className="text-sm font-medium group-hover:text-[#9a6efe] transition-colors duration-200">
                    {actionItem.label}
                  </span>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
