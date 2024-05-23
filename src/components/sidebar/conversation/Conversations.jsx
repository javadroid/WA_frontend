import React from "react";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import { getConversationId, isUserOnline } from "../../../utils/chat";

export default function Conversations({onlineUsers,typing}) {
  const { conversations } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  return (
    <div className="convos scrollbar">
      <ul>
        {
          conversations &&
          conversations.filter((con)=>con.latestMessage).map((item, i) =>{ 
            return (
            <Conversation typing={typing} convo={item} key={item._id}  online={isUserOnline(user,item.users,onlineUsers)} />
          )})
        }
        
      </ul>
    </div>
  );
}
