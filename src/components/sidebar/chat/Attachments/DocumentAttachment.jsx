import React, { useRef } from "react";
import { DocumentIcon } from "../../../../assets/svg";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../utils/redux/features/chatSlice";
import { getFileType } from "../../../../utils/file";

export default function DocumentAttachment() {
  const inputRef = useRef();
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
        file.type !== "application/x-zip-compressed" &&
        file.type !==
          "appliction/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !==
          "appliction/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        console.log(file.type);
        files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 10) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
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
    <li>
      <button
        onClick={() => inputRef.current.click()}
        type="button"
        className="bg-[#5F66CD] rounded-full"
      >
        <DocumentIcon />
        <input
          accept="audio/mp4,audio/wav,application/zip,application/vnd.rar,appliction/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/pdf,text/plain,application/msword,appliction/vnd.openxmlformats-officedocument.wordprocessingml.document,appliction/vnd.openxmlformats-officedocument.presentationml.presentation"
          type="file"
          hidden
          multiple
          ref={inputRef}
          onChange={DocumentHandle}
        />
      </button>
    </li>
  );
}
