import React from "react";
import { useSelector } from "react-redux";
import { DotsIcon, SearchLargeIcon } from "../../../assets/svg";

export default function ChatHeader({activeConversation}) {
  const { name, picture } = activeConversation;
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      <div className="w-full flex items-center justify-between">
        {/*Left*/}
        <div className="flex items-center gap-x-4">
          <button className="btn">
            <img
              className="w-full h-full rounded-full object-cover"
              src={picture}
              alt={name}
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {name.split(" ")[0][0].toUpperCase()+name.substring(1).toLowerCase()}
            </h1>
            <span className="text-xs dark:text-dark_svg_2">online</span>
          </div>
        </div>

        {/*Right*/}

        <ul className="flex items-center gap-x-2.5">
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
