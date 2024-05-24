import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/redux/features/useSlice";
import Sidebar from "../components/sidebar/Sidebar";
import Peer from "simple-peer";
import "global";

import {
  getConversations,
  updateMessages,
} from "../utils/redux/features/chatSlice";
import Conversations from "../components/sidebar/conversation/Conversations";
import WhatsappHome from "../components/sidebar/chat/WhatsappHome";
import ChatContainer from "../components/sidebar/chat/ChatContainer";
import SocketContext from "../context/SocketContext";
import Call from "../components/sidebar/chat/call/Call";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chat";

const callData = {
  socketId: "",
  receivingCall: false,
  callEnded: false,
  name: "",
  signal: "",
  picture: "",
};
function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setonlineUsers] = useState([]);
  const [typing, settyping] = useState(false);
  const [stream, setstream] = useState(false);
  const [call, setcall] = useState(callData);
  const [show, setshow] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectRef = useRef();
  const [callAccepted, setcallAccepted] = useState(false);
  // get conversBations
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
      settyping(data);
    });
    socket.on("stop_typing", async (data) => {
      settyping(false);
    });
  }, []);

  //call useEffect
  useEffect(() => {
    setupMedia();

    socket.on("setup_socket", (id) => {
      setcall({ ...call, socketId: id });
    });

    socket.on("call_user", (data) => {
      setcall({
        ...call,
        callEnded:false,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true,
      });
    });

    socket.on("end_call", () => {
      setshow(false);
      
      setcall({ ...call, callEnded: true, receivingCall: false });
      myVideo.current.srcObject = null;
      setcallAccepted(false)
      if (callAccepted) {
        connectRef?.current?.destroy();
      }
    });
  }, []);
  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stm) => {
        setstream(stm);
      });
  };

  const endCall = () => {
    setshow(false);
   
    setcall({ ...call, callEnded: true, receivingCall: false });
    myVideo.current.srcObject = null;
    socket.emit("end_call", call.socketId);
    setcallAccepted(false)
    connectRef?.current?.destroy();
  };
  const callUser = () => {
    
    enableMedia();
    setcall({
      ...call,
      callEnded: false,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      console.log("data", data);
      socket.emit("call_user", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: call?.socketId,
        name: user.name,
        picture: user.picture,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    
    socket.on("call_accepted", (signal) => {

      console.log("call_accepted",signal)
      setcallAccepted(true);
      peer.signal(signal);
    });
    connectRef.current = peer;
   
  };

  const answerCall = () => {
    enableMedia();
    setcallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answer_call", {
        signal: data,
        to: call.socketId,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(call.signal);
    connectRef.current = peer;
  };

  const enableMedia = () => {
    setshow(true);
    myVideo.current.srcObject = stream;
  };
  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center  overflow-hidden">
        {/*Container*/}
        <div className="container  h-screen flex">
          {/*Siderbar*/}
          <Sidebar typing={typing} onlineUsers={onlineUsers} />

          {activeConversation._id ? (
            <ChatContainer
              callUser={callUser}
              typing={typing}
              onlineUsers={onlineUsers}
            />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>

      <div className={(show || call.signal) && !call.callEnded ? "" : "hidden"}>
        <Call
          stream={stream}
          myVideo={myVideo}
          userVideo={userVideo}
          call={call}
          show={show}
          endCall={endCall}
          setcall={setcall}
          callAccepted={callAccepted}
          answerCall={answerCall}
        />
      </div>
    </>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
