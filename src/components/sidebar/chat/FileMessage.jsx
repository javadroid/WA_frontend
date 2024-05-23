import moment from "moment";
import React from "react";
import TraingleIcon from "../../../assets/svg/TraingleIcon";
import FileImageVideo from "./FileImageVideo";
import FileDocument from "./FileDocumet";

export default function FileMessage({ message, me, file }) {
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me && "ml-auto justify-end"
      }`}
    >
      <div>
        <div
          className={`${
            me && file.file.public_id.split(".")[1] === "png"
              ? "bg-white"
              : "bg-green_3 p-1"
          } relative h-full dark:text-dark_text_1  rounded-lg ${
            me ? "  border-[3px] border-green_1" : "dark:bg-dark_bg_2"
          }`}
        >
          <div
            className={` h-full  text-sm ${
              file.type !== "IMAGE" && file.type !== "VIDEO" && "pb-5"
            }`}
          >
            {file.type === "IMAGE" || file.type === "VIDEO" ? (
              <FileImageVideo type={file.type} url={file.file.secure_url} />
            ) : (
              <FileDocument type={file.type} url={file.file} />
            )}
          </div>

          <span className="absolute right-1.5 bottom-1.5 text-xs leading-none text-dark_text_5">
            {moment(message.updatedAt).format("HH:mm")}
          </span>
          {!me && (
            <span>
              <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5 " />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
