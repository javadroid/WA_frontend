import React, { useState } from "react";
import AddFile from "./AddFile";
import { SendIcon } from "../../../../../assets/svg";
import { uploadFiles } from "../../../../../utils/file";
import { useDispatch, useSelector } from "react-redux";
import { clearFiles, removeAFile, sendMessage } from "../../../../../utils/redux/features/chatSlice";
import SocketContext from "../../../../../context/SocketContext";
import { ClipLoader } from "react-spinners";

 function HandleAndSend({
  files,
  message,
  setmessage,
  setactiveIndex,
  activeIndex,
  socket
}) {
    const dispatch = useDispatch();
  const {user} =useSelector(state=>state.user)
  const {activeConversation,status} =useSelector(state=>state.chat)
    const [loading, setloading] = useState(false)

  
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setloading(true)
    const uploaded_files=await uploadFiles(files)
    const values = {
        token: user.access_token,
        convo_id: activeConversation._id,
        message,
        files:uploaded_files,
      };
    const send = await dispatch(sendMessage(values));
    socket.emit("send_message",send.payload)
    setmessage("");
    dispatch(clearFiles());
    setloading(true)
  };

  const removeFile=(file)=>{
dispatch(removeAFile(file))
  }
  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-x-dark_bg_2">
      <span></span>
      <div className="flex items-center gap-x-2">
        {files.map((file, i) => (
          <div
            key={i}
            onClick={() => setactiveIndex(i)}
            onDoubleClick={()=>removeFile(file)}
            className={`${
              activeIndex === i && "border-[3px] !order-green_1"
            } w-14 h-14 border mt-2 dark:border-white rounded-md overflow-hidden cursor-pointer`}
          >
            {file.type === "IMAGE" ? (
              <img src={file.fileBase64} alt="" />
            ) : file.type === "VIDEO" ? (
              <video src={file.fileBase64}></video>
            ) : (
              <img
                className="w-8 h-10 mt-1.5 ml-2.5"
                src={`../../../../../../public/file/${file.type}.png`}
                alt=""
              />
            )}
          </div>
        ))}

        <AddFile setactiveIndex={setactiveIndex} />
      </div>

      <div
        onClick={sendMessageHandler}
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
      >
      

        {loading? (
            <ClipLoader size={25} color="#E9EDEF" />
          ) : (
            <SendIcon className={"fill-white"} />
          )}
      </div>
    </div>
  );
}

const HandleAndSendWithSocket = (props) => (
    <SocketContext.Consumer>
      {(socket) => <HandleAndSend {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
  export default HandleAndSendWithSocket;