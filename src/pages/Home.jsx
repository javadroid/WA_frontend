import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/redux/features/useSlice";
import Sidebar from "../components/sidebar/Sidebar";
import { getConversations } from "../utils/redux/features/chatSlice";
import Conversations from "../components/sidebar/conversation/Conversations";
import WhatsappHome from "../components/sidebar/chat/WhatsappHome";
import ChatContainer from "../components/sidebar/chat/ChatContainer";

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  function open() {
    dispatch(logout());
  }
  // get conversations
  useEffect(() => {
    if (user?.access_token) {
      dispatch(getConversations(user?.access_token));
    }
  }, []);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center  overflow-hidden">
      {/*Container*/}
      <div className="container py-[19px] h-screen flex">
        {/*Siderbar*/}
        <Sidebar />
       
        {
          activeConversation._id?(
            <ChatContainer/>
          ):(
            <WhatsappHome/>
          )
        }
      </div>
    </div>
  );
}
