import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUplaodProps {
  onChange: (value: string) => void;
  value: string;
}

export default function ImageUpload({ onChange, value }: ImageUplaodProps) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="gxmypa8b"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => {
              setTimeout(() => {
                open();
              }, 1000);
            }}
            className="
            relative
            cursor-pointer
            hover:opacity-70
            transition
            border-2
            p-20
            border-neutral-300
            flex flex-col justify-center items-center gap-4
            text-neutral-600
          "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to uopload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
