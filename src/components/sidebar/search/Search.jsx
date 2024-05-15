import React, { useState } from "react";
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../assets/svg";

export default function Search({ searchLength }) {
  const [show, setshow] = useState(false);
  const handleSearch=(e)=>{

  }
  return (
    <div className="h-[49px] py-1.5">
      {/*Container*/}

      <div className="flex items-center gap-x-2">
        {/*Search input container*/}

        <div className=" w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
          {show || searchLength > 0 ? (
            <span className="w-8 flex items-center justify-center rotateAnimation">
              <ReturnIcon className={"fill-green_1 w-5"} />
            </span>
          ) : (
            <span className="w-8 flex items-center justify-center ">
              <SearchIcon className={"dark:fill-dark_svg_2 w-5"} />
            </span>
          )}
          <input
            onBlur={() => searchLength===0 && setshow(false)}
            onFocus={() => setshow(true)}
            onKeyDown={(e)=>handleSearch(e)}
            className="input"
            type="text"
            placeholder="Search or start a new chat"
          />
          <button className="btn">
          <FilterIcon className={"dark:fill-dark_svg_2"}/>
          </button>
        </div>
      </div>
    </div>
  );
}
