import React, { useEffect, useRef, useState } from "react";

import Attachment from "./Attachment";
import { SendIcon } from "../../../assets/svg";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../utils/redux/features/chatSlice";
import { ClipLoader } from "react-spinners";
import EmojiPickerApp from "./EmojiPicker";
import SocketContext from "../../../context/SocketContext";

function ChatAction({socket, status, user, activeConversation }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false)
  const [files, setFiles] = useState([]);
  const [showPicker, setshowPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const textRef=useRef()
  const values = {
    token: user.access_token,
    convo_id: activeConversation._id,
    message,
    files,
  };

  useEffect(() => {
    
  }, [])
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    setloading(true)
    if (
      (message !== "" && files.length === 0) ||
      (message === "" && files.length !== 0)
    ) {
      const send = await dispatch(sendMessage(values));
      socket.emit("send_message",send.payload)
      setMessage("");
      setshowPicker(false)
      setloading(true)
    }
  };


  return (
    <form
      onSubmit={handleSendMessage}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        {/*Emojis and attachments*/}

        <ul className="flex  gap-x-2">
          <EmojiPickerApp setShowAttachments={setShowAttachments} showPicker={showPicker} setshowPicker={setshowPicker} message={message} setMessage={setMessage} textRef={textRef}/>
          <Attachment showAttachments={showAttachments} setShowAttachments={setShowAttachments} setshowPicker={setshowPicker} />
        </ul>
        {/*Input*/}

        <Input textRef={textRef}  message={message} setMessage={setMessage} />

        <button type="submit" className="btn">
          {status === "loading" ? (
            <ClipLoader size={25} color="#E9EDEF" />
          ) : (
            <SendIcon className={"dark:fill-dark_svg_1"} />
          )}
        </button>
      </div>
    </form>
  );
}

const ChatActionWithSocket=(props)=>(
  <SocketContext.Consumer >
  {
    (socket)=><ChatAction {...props} socket={socket}/>
  }
  </SocketContext.Consumer>
)
export default ChatActionWithSocket