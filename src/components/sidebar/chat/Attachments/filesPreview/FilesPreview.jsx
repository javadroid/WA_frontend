import React, { useState } from "react";
import Header from "./Header";
import FileViewer from "./FileViewer";
import Input from "./Input";
import HandleAndSend from "./HandleAndSend";
import { useSelector } from "react-redux";

export default function FilesPreview({files}) {
  const [message, setmessage] = useState("")
  const [activeIndex, setactiveIndex] = useState(0)
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      <div className="w-full flex flex-col items-center ">
        <Header activeIndex={activeIndex}  files={files} />
        <FileViewer activeIndex={activeIndex}  files={files} />
        <div className="w-full flex flex-col items-center">
          <Input message={message} setmessage={setmessage} />
          <HandleAndSend setmessage={setmessage} activeIndex={activeIndex} setactiveIndex={setactiveIndex} files={files}/>
        </div>
      </div>
    </div>
  );
}
