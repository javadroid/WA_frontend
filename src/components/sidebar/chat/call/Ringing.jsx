import React, { useEffect, useState } from "react";
import { CloseIcon } from "../../../../assets/svg";
import ValidIcon from "../../../../assets/svg/Valid";

export default function Ringing({endCall, callAccepted,answerCall, call, setcall }) {
  const [timer, settimer] = useState(0);
  const { receivingCall, callEnded } = call;
  let ringInterval;
  useEffect(() => {
    if (timer <= 10) {
      handleTime();
    } else {
      setcall({ ...call, receivingCall: false,callEnded:true });
      endCall()
    }
    return () => clearInterval(ringInterval);
  }, [timer]);

  const handleTime = () => {
    ringInterval = setInterval(() => {
      settimer((prev) => prev + 1);
    }, 1000);
  };

  console.log(timer)

  return (
    <div className="z-30 dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
      <div className="p-4 items-center justify-between gap-x-8 flex">
        <div className="flex items-center gap-x-2">
          <img className="w-28 h-28 rounded-full" src={call?.picture} alt="" />

          <div>
            <h1 className="dark:text-white">
              <b>{call?.name}</b>
            </h1>
            <span className="dark:text-dark_text_2">Whatsapp video...</span>
          </div>
        </div>

        <ul className="flex items-center gap-x-2">
          <li onClick={endCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <CloseIcon className={"fill-white w-5"} />
            </button>
          </li>

          <li onClick={answerCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
              <ValidIcon className={"fill-white w-6 mt-2"} />
            </button>
          </li>
        </ul>
      </div>

      <audio src={"../../../../../audio/ringtone.mp3"} autoPlay loop></audio>
    </div>
  );
}
