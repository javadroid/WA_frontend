import React, { useRef } from "react";

export default function Input({textRef,message,setMessage}) {
    
  return (
    <div className="w-full">
      <input
        type="text"
        ref={textRef}
        value={message}
        onChange={(e)=>setMessage(pre=>pre=e.target.value)}
        placeholder="Type a message"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
      />
    </div>
  );
}
