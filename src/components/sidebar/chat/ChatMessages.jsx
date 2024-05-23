import React, { useEffect, useRef } from "react";
import Message from "./Message";
import Typing from "./Typing";
import FileMessage from "./FileMessage";

export default function ChatMessages({ user, messages, typing }) {
  const endRef = useRef();

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mb-[60px] bg-cover bg-no-repeat bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]">
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {messages &&
          messages.map((msg, i) => (
           <>

           {
            msg?.files.length>0&& msg.files.map((file,i)=>(
              <FileMessage
              file={file}
              me={user._id === msg.sender._id}
              message={msg}
              key={msg._id}
              />
            ))
           }
           {
            msg?.message?.length>0&&(
              <Message
              me={user._id === msg.sender._id}
              message={msg}
              key={msg._id}
            />
            )
          }
           </>
            
          ))}
        {typing && <Typing />}
        <div className="mt-3" ref={endRef}></div>
      </div>
    </div>
  );
}
