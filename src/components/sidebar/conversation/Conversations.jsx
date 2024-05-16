import React from "react";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";

export default function Conversations() {
  const { conversations } = useSelector((state) => state.chat);
  return (
    <div className="convos scrollbar">
      <ul>
        {
          conversations &&
          conversations.filter((con)=>con.latestMessage).map((item, i) => (
            <Conversation convo={item} key={item._id} />
          ))
        }
      </ul>
    </div>
  );
}
