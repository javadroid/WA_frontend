import React from "react";
import { CloseIcon } from "../../../../../assets/svg";
import { useDispatch } from "react-redux";
import { clearFiles } from "../../../../../utils/redux/features/chatSlice";

export default function Header({files,activeIndex}) {
  const dispatch = useDispatch();
  const closeFile = () => {
    dispatch(clearFiles());
  };
  return (
    <div className="w-full pl-4">
      <div className="w-full flex items-center justify-between">
        <div onClick={closeFile} className="translate-x-1 cursor-pointer">
          <CloseIcon className={"dark:fill-dark_svg_1"} />
        </div>

        <h1 className="dark:text-dark_text_1 text-[15px] ">{files[activeIndex]?.file?.name}</h1>
        <span></span>
      </div>
    </div>
  );
}
