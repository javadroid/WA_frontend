import React from "react";
import { useSelector } from "react-redux";
import { CallIcon, DotsIcon, SearchLargeIcon } from "../../../assets/svg";
import { getConversationId, getConversationName, getConversationPicture, isUserOnline } from "../../../utils/chat";

import VideoCallIcon from "../../../assets/svg/VideoCall";


export default function ChatHeader({onlineUsers,activeConversation,user,callUser,typing}) {
  const { _id,name, picture ,users} = activeConversation;
  
 
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      <div className="w-full flex items-center justify-between">
        {/*Left*/}
        <div className="flex items-center gap-x-4">
          <button className="btn">
            <img
              className="w-full h-full rounded-full object-cover"
              src={getConversationPicture(user, users)}
              alt={getConversationName(user, users)}
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {getConversationName(user, users).split(" ")[0][0].toUpperCase()+getConversationName(user, users).substring(1).toLowerCase()}
            </h1>
            <span className="text-xs dark:text-dark_svg_2">{typing===_id?<p className="text-green_1">Typing...</p>:isUserOnline(user,users,onlineUsers)?"online":"offline"}</span>
          </div>
        </div>

        {/*Right*/}

        <ul className="flex items-center gap-x-2.5">

        <li onClick={() => callUser()}>
        <button className="btn">
          <VideoCallIcon />
        </button>
      </li> 
      <li>
      <button className="btn">
        <CallIcon />
      </button>
    </li>
        <li>
            <button className="btn">
              <SearchLargeIcon className={"dark:fill-dark_svg_1"} />
            </button>
          </li> 
        <li>
            <button className="btn">
              <DotsIcon className={"dark:fill-dark_svg_1"} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
