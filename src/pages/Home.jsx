import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/redux/features/useSlice";
import Sidebar from "../components/sidebar/Sidebar";
import {
  getConversations,
  updateMessages,
} from "../utils/redux/features/chatSlice";
import Conversations from "../components/sidebar/conversation/Conversations";
import WhatsappHome from "../components/sidebar/chat/WhatsappHome";
import ChatContainer from "../components/sidebar/chat/ChatContainer";
import SocketContext from "../context/SocketContext";

function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setonlineUsers] = useState([]);
  const [typing, settyping] = useState(false);
  // get conversations
  useEffect(() => {
    if (user?.access_token) {
      socket.emit("join", user._id);
      socket.on("get_online_users", (users) => {
        setonlineUsers(users);
      });
      dispatch(getConversations(user?.access_token));
    }
  }, [user]);

  //listening to message_receive
  useEffect(() => {
    socket.on("message_receive", async (message) => {
      await dispatch(updateMessages(message));
    });

    socket.on("typing", async (data) => {
      console.log("typing",data)
      settyping(data);
    });
    socket.on("stop_typing", async (data) => {
      console.log("stop_typing",data)
      settyping(false);
    });
  }, []);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center  overflow-hidden">
      {/*Container*/}
      <div className="container  h-screen flex">
        {/*Siderbar*/}
        <Sidebar typing={typing} onlineUsers={onlineUsers} />

        {activeConversation._id ? (
          <ChatContainer typing={typing} onlineUsers={onlineUsers} />
        ) : (
          <WhatsappHome />
        )}
      </div>
    </div>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
