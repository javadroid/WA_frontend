import React, { useState } from "react";
import EmojiPicker from "./EmojiPicker";
import Attachment from "./Attachment";
import { SendIcon } from "../../../assets/svg";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../utils/redux/features/chatSlice";
import { ClipLoader } from "react-spinners";

export default function ChatAction({status, user, activeConversation }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const values = {
    token: user.access_token,
    convo_id: activeConversation._id,
    message,
    files,
  };
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if((message!==""&&files.length===0)||(message===""&&files.length!==0)  ){
      const send = await dispatch(sendMessage(values));
      setMessage("");
    }
   
  };
  return (
    <form  onClick={handleSendMessage} className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none">
      <div className="w-full flex items-center gap-x-2">
        {/*Emojis and attachments*/}

        <ul className="flex  gap-x-2">
          <EmojiPicker />
          <Attachment />
        </ul>
        {/*Input*/}

        <Input message={message} setMessage={setMessage} />

        <button className="btn">
{
  status==="loading"?(
    <ClipLoader size={25} color="#E9EDEF" />
  ):(
     <SendIcon className={"dark:fill-dark_svg_1"} />
        
  )
}
         </button>
      </div>
    </form>
  );
}
