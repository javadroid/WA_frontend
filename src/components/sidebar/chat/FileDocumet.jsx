import React from "react";
import DownloadIcon from "../../../assets/svg/DownloadIcon";

export default function FileDocument({ url, type }) {
  console.log(url);
  return (
    <div className="cursor-pointer bg-green_4 p-2 rounded-lg ">
      <div className="flex justify-between gap-x-8">
        <div className="flex items-center gap-2">
          <img
            className="w-8 object-contain"
            src={`../../../../public/file/${type}.png`}
            alt=""
          />
          <div className="flex flex-col gap-2">
            <h1>{url?.public_id}</h1>
            <span className="text-sm">
              {type} : {url.bytes}
            </span>
          </div>
        </div>
        <a download target="_blank" href={url.secure_url}>
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
}
