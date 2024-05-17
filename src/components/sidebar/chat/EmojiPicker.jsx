import React, { useEffect, useState } from "react";
import { CloseIcon, EmojiIcon } from "../../../assets/svg";
import EmojiPicker from "emoji-picker-react";

export default function EmojiPickerApp({setShowAttachments,setMessage,message, textRef,showPicker, setshowPicker }) {

  const [cursorPosition, setcursorPosition] = useState();

  useEffect(() => {
    textRef.current.selectionEnd =cursorPosition
  }, [cursorPosition])
  
  const handleEmoji = (data, e) => {
    const { emoji } = data;
    const ref = textRef.current;
    
    ref.focus();
    const start=ref?.value.substring(0,ref.selectionStart)
    const end=ref?.value.substring(ref.selectionStart)
    const newText=start+emoji+end
   
    setMessage(pre=>pre=newText)
    
    setcursorPosition(start.length+emoji.length)
  };
  return (
    <li className="w-full">
      <button type="button" onClick={() => {setshowPicker(!showPicker);setShowAttachments(false)}} className="btn">
        {showPicker ? (
          <CloseIcon className={"dark:fill-dark_svg_1"} />
        ) : (
          <EmojiIcon className={"dark:fill-dark_svg_1"} />
        )}
      </button>
      {showPicker && (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
}
