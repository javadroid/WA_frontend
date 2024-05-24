import React, { useRef, useState } from "react";
import { CloseIcon } from "../../../../../assets/svg";
import { addFiles } from "../../../../../utils/redux/features/chatSlice";
import { useDispatch } from "react-redux";
import { getFileType } from "../../../../../utils/file";

export default function AddFile({ setactiveIndex }) {
    const inputRef=useRef()
    const dispatch = useDispatch();
    const DocumentHandle = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((file) => {
          if (
            file.type !== "application/zip" &&
            file.type !== "application/vnd.rar" &&
            file.type !==
              "appliction/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
            file.type !== "application/vnd.ms-excel" &&
            file.type !== "application/vnd.ms-powerpoint" &&
            file.type !== "application/pdf" &&
            file.type !== "application/msword" &&
            file.type !== "text/plain" &&
            file.type !== "audio/mp3" &&
            file.type !== "audio/wav" &&
            file.type !== "image/png" &&
            file.type !== "image/jpeg" &&
            file.type !== "image/jpg" &&
            file.type !== "image/gif" &&
            file.type !== "image/webp" &&
            file.type !== "video/mp4" &&
            file.type !== "video/mpeg" &&
            file.type !== "video/webm" &&
            file.type !== "image/webp"&&
            file.type !== "application/x-zip-compressed" &&
            file.type !==
              "appliction/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
            file.type !==
              "appliction/vnd.openxmlformats-officedocument.presentationml.presentation"
          ) {
            
            files.filter((item) => item.name !== file.name);
            return;
          }else if (file.size > 1024 * 1024 * 10) {
            files = files.filter((item) => item.name !== file.name);
            return;} else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
              
              dispatch(
                addFiles({
                  file: file,
                  type: getFileType(file.type),
                  fileBase64: e.target.result,
                })
              );
            };
          }
        });
      };
  return (
    <div onClick={()=>inputRef.current.click()} className="w-14 h-14 border mt-2 dark:border-white flex items-center justify-center cursor-pointer">
      <span  className=" rotate-45">
        <CloseIcon className={"dark:fill-dark_svg_1  "} />
      </span>

      <input
        accept="image/png,image/jpg,image/jpeg,image/gif,image/webp,video/wav,video/mp4,audio/mp4,audio/wav,application/zip,application/vnd.rar,appliction/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/pdf,text/plain,application/msword,appliction/vnd.openxmlformats-officedocument.wordprocessingml.document,appliction/vnd.openxmlformats-officedocument.presentationml.presentation"
        type="file"
        hidden
        multiple
        ref={inputRef}
        onChange={DocumentHandle}
      />
    </div>
  );
}
