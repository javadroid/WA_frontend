import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationId } from "../../../utils/chat";
import { openCreateConversation } from "../../../utils/redux/features/chatSlice";

export default function Contact({ contact }) {
    const {user} =useSelector(state=>state.user)
    const dispatch=useDispatch()

    const values={
      receiver_id:contact._id,
      token:user.access_token
    }
    const openConversation=()=>{
      dispatch(openCreateConversation(values))
    }
  
    return (
    <li onClick={openConversation} className="list-none h-[72px]  hover:dark:bg-dark_bg_4 cursor-pointer dark:text-dark_text_1 px-[10px]">
      {/** Container */}
      <div className=" flex items-center justify-between gap-x-3 py-[10px]">
        {/** Contact */}
        <div className="flex items-center  gap-x-3">
          {/** User picture */}
          <div className="relative min-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={contact.picture}
              alt={contact.name}
            />
          </div>
          {/** Conversation name and status */}
          <div className="w-full flex flex-col">
            {/** Name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {contact?.name}
            </h1>
            {/** Staus */}
            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
              <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                <p>{contact.status}</p>
              </div>
            </div>
          </div>
        </div>
        {/** Right */}
        {
            user._id===contact._id&&(
                <div className="flex items-center gapx3">
          <span className="dark:text-dark_text_2">
            {"You"}
          </span>
        </div>
            )
        }
        
      </div>
      {/*Border*/}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    
    </li>
  );
}
