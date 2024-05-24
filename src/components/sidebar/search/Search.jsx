import React, { useState } from "react";
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../assets/svg";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Search({ searchLength,setsearchResult }) {
  const [show, setshow] = useState(false);
  const [text, settext] = useState("");
  const {user} = useSelector(state=>state.user)
  const handleSearchKey = async (e) => {
    const input = e.target.value;
    if (input && e.key === "Enter") {
      
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/user?search=${input}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        setsearchResult(data)
      } catch (error) {
        console.log(error)
        console.log(error.response?.data.error.message)
      }
    }else if((!input || input==="") && e.key === "Enter" ){
      setsearchResult([])
    }
  };

  const handleSearch = (e) => {
    settext(e)
    // console.log(e);
  };

  const closeTyping=()=>{
    settext(pre=>pre="")
    settext("")
    console.log("text",text)
    setsearchResult([]) 
    
  }
  return (
    <div className="h-[49px] py-1.5">
      {/*Container*/}

      <div className="flex items-center gap-x-2">
        {/*Search input container*/}

        <div className=" w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
          {show || searchLength > 0 ? (
            <span onClick={closeTyping} className="w-8 cursor-pointer flex items-center justify-center rotateAnimation">
              <ReturnIcon  className={"fill-green_1 w-5"} />
            </span>
          ) : (
            <span className="w-8 flex items-center justify-center ">
              <SearchIcon className={"dark:fill-dark_svg_2 w-5"} />
            </span>
          )}
          <input
            onBlur={() => searchLength === 0 && setshow(false)}
            onFocus={() => setshow(true)}
            onKeyDown={(e) => handleSearchKey(e)}
            className="input"
            type="text"
            value={text}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search or start a new chat"
          />
          <button className="btn">
            <FilterIcon className={"dark:fill-dark_svg_2"} />
          </button>
        </div>
      </div>
    </div>
  );
}
