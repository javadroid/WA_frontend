import React from "react";

export default function FileViewer({ files,activeIndex }) {
  return (
    <div className="w-full max-w-[60%] ">
      <div className="flex justify-center items-center">
        {files[activeIndex]?.type === "IMAGE" ? (
          <img
            src={files[activeIndex].fileBase64}
            className="max-w-[80%] object-contain hview"
            alt={files[activeIndex].type}
          />
        ) : files[activeIndex]?.type === "VIDEO" ? (
          <video className="max-w-[80%] object-contain hview" controls src={files[activeIndex].fileBase64}></video>
        ) : (
          <div className="min-w-full hview flex flex-col items-center justify-center">
          <img src={`../../../../../../public/file/${files[activeIndex]?.type}.png`} alt={files[activeIndex]?.file.name} />
            <h1 className="dark:text-dark_text_2 text-2xl">
            No preview available
          </h1>
            <span className="dark:text-dark_text_2 ">
               {files[activeIndex]?.file?.size} KB - {files[activeIndex]?.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
