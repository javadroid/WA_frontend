import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import { useDispatch, useSelector } from 'react-redux';
import { getConversationMessage } from '../../../utils/redux/features/chatSlice';
import ChatAction from './ChatAction';

export default function ChatContainer({onlineUsers}) {
  const dispatch =useDispatch()
  const { activeConversation,messages,status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
 const values={
  token:user.access_token,
  convo_id:activeConversation._id
 }
  useEffect(() => {
   if(activeConversation._id){

    dispatch(getConversationMessage(values))
   }
 }, [activeConversation])
 
  return (
    <div className="relative h-full w-full  select-none border-l   dark:border-l-dark_border_2 overflow-hidden">
    <div>
      <ChatHeader onlineUsers={onlineUsers} user={user} activeConversation={activeConversation}/>
      <ChatMessages user={user} messages={messages}/>
      <ChatAction status={status} user={user} messages={messages} activeConversation={activeConversation}/>
      </div>
  </div>
  )
}
