import React, { useState } from "react";
import { useSelector } from "react-redux";
import CummunityIcon from "../../../assets/svg/Community";
import { ChatIcon, DotsIcon, StoryIcon } from "../../../assets/svg";
import Menu from "./Menu";
export default function SidebarHeader() {
  
  const { user } = useSelector((state) => state.user);
const [showMenu, setshowMenu] = useState(false)
 
return (
    <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16">
      {/*Container*/}

      <div className="w-full flex items-center justify-between">
        {/*User image*/}
        <button className="btn">
          <img
            className="w-full h-full rounded-full object-cover"
            src={user.picture}
            alt={user.name}
          />
        </button>
        {/*User icons*/}
        <ul className="flex items-center gap-x-2 5">
          <li>
            <button className="btn">
              <CummunityIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <StoryIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <ChatIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li className="relative" onClick={()=>setshowMenu(!showMenu)}>
            <button className={`btn ${showMenu ?"bg-dark_hover_1":""}`}>
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
            {
              showMenu&&<Menu/>
            }
          </li>
        </ul>
      </div>
    </div>
  );
}
