import React from "react";
import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

interface Props {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}

export const Thumbnail = ({
  type,
  extension,
  url = "",
  imageClassName,
  className,
}: Props) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn("thumbnail", className)}>
      <Image
        src={
          isImage && url
            ? url
            : getFileIcon(extension, type) || "/placeholder.png"
        }
        alt="thumbnail"
        width={30}
        height={30}
        className={cn(
          "size-6 object-contain rounded-full",
          imageClassName,
          isImage && "thumbnail-image size-full object-cover object-center"
        )}
      />
    </figure>
  );
};
export default Thumbnail;
