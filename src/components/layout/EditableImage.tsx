import { ChangeEvent, FC } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { EditableImageProps } from "@/app/types/Images";

const EditableImage: FC<EditableImageProps> = ({
  link,
  setLink,
  width,
  height,
}) => {
  async function handleFileChange(ev: ChangeEvent<HTMLInputElement>) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      data.set("width", width);
      data.set("height", height);
      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link: string) => {
            setLink(link);
          });
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      });
    }
  }

  let parsedWidth = 250;
  let parsedHeight = 250;

  if (width) {
    const match = width.match(/\d+/);
    if (match) {
      parsedWidth = parseInt(match[0], 10);
    }
  }
  if (height) {
    const match = height.match(/\d+/);
    if (match) {
      parsedHeight = parseInt(match[0], 10);
    }
  }

  return (
    <>
      {!link && (
        <p className="text-center text-blue-300">Using default image</p>
      )}
      <Image
        className="rounded-lg w-full h-full mb-1"
        src={link ? link : "/logo.png"}
        width={parsedWidth}
        height={parsedHeight}
        alt={"avatar"}
      />
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No uploaded image
        </div>
      )}
      <label className="z-50 relative">
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 bg-neutral-100 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
};

export default EditableImage;
