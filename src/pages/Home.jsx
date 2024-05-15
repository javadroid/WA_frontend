import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../utils/redux/features/useSlice'
import Sidebar from '../components/sidebar/Sidebar'
import { getConversations } from '../utils/redux/features/chatSlice'

export default function Home() {
    const dispatch=useDispatch()
    const {user}=useSelector(state=>state.user)
    function open(){
        dispatch(logout())
    }
   // get conversations
    useEffect(() => {
      if(user?.access_token){
        dispatch(getConversations(user?.access_token))
      }
    }, [])
    
  return (
    <div className='min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden'>
    {/*Container*/}
    <div className='container min-h-screen flex'>
    {/*Siderbar*/}
    <Sidebar/>
    </div>
    </div>
  )
}
