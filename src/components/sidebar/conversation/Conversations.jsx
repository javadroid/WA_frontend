import React from "react";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import { getConversationId } from "../../../utils/chat";

export default function Conversations({onlineUsers}) {
  const { conversations } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  return (
    <div className="convos scrollbar">
      <ul>
        {
          conversations &&
          conversations.filter((con)=>con.latestMessage).map((item, i) =>{ 
            let check=onlineUsers.find((u)=>u.userId===getConversationId(user,item.users))
            return (
            <Conversation convo={item} key={item._id}  online={check?true:false} />
          )})
        }
        
      </ul>
    </div>
  );
}
