import moment from "moment";
import React from "react";

export default function Message({ message, me }) {
    me=true
  console.log("messages", message);
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me && "ml-auto justify-end"
      }`}
    >
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
            me ? "bg-green_3" : "dark:bg-dark_bg_2"
          }`}
        >

        <p className="float-left h-fill text-sm pb-4 pr-8 ">{message.message}</p>
          
        <span className="absolute right-1.5 bottom-1.5 text-xs leading-none text-dark_text_5">
        {moment(message.updatedAt).format("HH:mm")}
        </span>

        
        </div>
      </div>
    </div>
  );
}
// {
//     !me&&(
//         <span>
//         <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5 "/>
//         </span>
//     )
// }