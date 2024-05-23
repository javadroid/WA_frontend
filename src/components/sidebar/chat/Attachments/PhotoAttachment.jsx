import React, { useRef } from "react";
import { PhotoIcon } from "../../../../assets/svg";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../utils/redux/features/chatSlice";
import { getFileType } from "../../../../utils/file";

export default function PhotoAttachment() {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const ImageHandle = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/gif" &&
        file.type !== "image/webp" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "video/webm" &&
        file.type !== "image/webp"
      ) {
        console.log("object nothing",file.type)
        files.filter((item) => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          dispatch(
            addFiles({
              file: file,
              type:  getFileType(file.type),
              fileBase64: e.target.result,
            })
          );
        };
      }
    });
  };
  return (
    <li>
      <button
        onClick={() => inputRef.current.click()}
        type="button"
        className="bg-[#BF59CF] rounded-full"
      >
        <PhotoIcon />
        <input
          accept="image/png,image/jpg,image/jpeg,image/gif,image/webp,video/wav,video/mp4"
          type="file"
          hidden
          multiple
          ref={inputRef}
          onChange={ImageHandle}
        />
      </button>
    </li>
  );
}
