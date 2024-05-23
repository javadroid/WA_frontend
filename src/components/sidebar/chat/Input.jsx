import React, { useRef, useState } from "react";
import SocketContext from "../../../context/SocketContext";
import { useSelector } from "react-redux";

function Input({ socket, textRef, message, setMessage }) {
  const [typying, setTyping] = useState(false);
  const { activeConversation } = useSelector((state) => state.chat);
  const onChangeHandler = (e) => {
    setMessage((pre) => (pre = e.target.value));
    if (!typying) {
      setTyping(true);
      socket.emit("typing", activeConversation._id);
    }
    let lastTypingTime = new Date().getTime();
    let timer = 2000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typying) {
        socket.emit("stop_typing", activeConversation._id);
        setTyping(false);
      }
    }, 1000);
  };
  const handleStopTyping = async (e) => {
  
    if (e.key === "Enter") {
      socket.emit("stop_typing", activeConversation._id);
      setTyping(false);
    }
  };
  return (
    <div className="w-full">
      <input
        type="text"
        ref={textRef}
        onKeyDown={(e) => handleStopTyping(e)}
        onBlur={()=>{
          socket.emit("stop_typing", activeConversation._id);
        setTyping(false);
        }}
        value={message}
        onChange={onChangeHandler}
        placeholder="Type a message"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
      />
    </div>
  );
}

const InputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Input {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default InputWithSocket;
