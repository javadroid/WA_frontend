import React, { useState } from "react";
import Ringing from "./Ringing";
import Header from "./Header";
import CallArea from "./CallArea";
import CallAction from "./CallAction";

export default function Call({
  stream,
  userVideo,
  answerCall,
  myVideo,
  show,
  endCall,
  callAccepted,
  call,
  setcall,
}) {
  const { receivingCall, callEnded } = call;
  const [showActions, setshowActions] = useState(false);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg
      ${receivingCall && !callAccepted ? "hidden" : ""}
      `}
        onMouseOver={() => setshowActions((prev) => (prev = true))}
        onMouseOut={() => setshowActions(false)}
      >
        <div>
          <div>
            <Header />
            <CallArea name={call?.name} />
            {showActions && <CallAction endCall={endCall} />}
          </div>

          <div>
            {callAccepted && !callEnded&& (
              <div >
                <video
                  playsInline
                  muted
                  autoPlay
                  onClick={() => setToggle((prev) => !prev)}
                  className={toggle ? "SmallVideoCall" : "largeVideoCall"}
                  ref={userVideo}
                ></video>
              </div>
            )}
          {
            stream&&  <div>
            <video
              playsInline
              muted
              autoPlay
              className={`${toggle ? "largeVideoCall" : "SmallVideoCall"} ${
                showActions ? "moveVideoCall" : ""
              }`}
              onClick={() => setToggle((prev) => !prev)}
              ref={myVideo}
            ></video>
          </div>
          }
          </div>
        </div>
      </div>
      {receivingCall && !callAccepted && (
        <Ringing endCall={endCall} answerCall={answerCall} call={call} setcall={setcall} />
      )}

      {!callAccepted && show ? (
        <audio src="../../../../../audio/ringing.mp3" autoPlay loop></audio>
      ) : null}
    </>
  );
}
