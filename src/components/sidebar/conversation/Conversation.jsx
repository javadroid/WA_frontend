import React from "react";
import { whatsappTimeDisplay } from "../../../utils/datatimeFormat";
import { useDispatch, useSelector } from "react-redux";
import { getConversationId, getConversationName, getConversationPicture } from "../../../utils/chat";
import { openCreateConversation } from "../../../utils/redux/features/chatSlice";
import SocketContext from "../../../context/SocketContext";

 function Conversation({ convo,socket,online ,typing}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const values = {
    receiver_id: getConversationId(user, convo.users),
    token: user.access_token,
  };
  const openConversation = async () => {
   const result=await dispatch(openCreateConversation(values));
   
   socket.emit("join_conversation",result.payload._id)
  };

  return (
    <li
      onClick={openConversation}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1 cursor-pointer dark:text-dark_text_1 px-[10px] 
      ${convo._id === activeConversation._id ? "dark:bg-dark_hover_1":"hover:dark:bg-dark_bg_4 "}`}
    >
      {/** Container */}
      <div className={`relative w-full flex items-center justify-between py-[10px] `} >
        {/** Left */}
        <div className="flex items-center gap-x-3">
          {/** User picture */}
          <div className={`relative min-w-[50px] h-[50px] rounded-full overflow-hidden ${online&&"online"}`}>
            <img
              className="w-full h-full object-cover"
              src={getConversationPicture(user, convo.users)}
              alt={getConversationName(user, convo.users)}
            />
          </div>
          {/** Conversation name and message */}
          <div className="w-full flex flex-col">
            {/** Name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {getConversationName(user, convo.users)}
            </h1>
            {/** Message */}
            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
              <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                <p>
                  {typing===convo._id?<p className="text-green_1">Typing...</p>:!convo?.latestMessage?.message ?"Files":convo?.latestMessage?.message?.length > 30
                    ? `${convo?.latestMessage?.message.substring(0, 30)}...`
                    : `${convo?.latestMessage?.message}`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        {/** Right */}
        <div className="flex items-center gapx3">
          <span className="dark:text-dark_text_2">
            {convo?.latestMessage?.updatedAt &&
              whatsappTimeDisplay(convo?.latestMessage?.updatedAt)}
          </span>
        </div>
      </div>
      {/*Border*/}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}

const ConversationWithSocket=(props)=>(
  <SocketContext.Consumer >
  {
    (socket)=><Conversation {...props} socket={socket}/>
  }
  </SocketContext.Consumer>
)
export default ConversationWithSocket
