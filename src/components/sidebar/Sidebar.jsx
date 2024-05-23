import React, { useState } from 'react'
import SidebarHeader from './header/SidebarHeader'
import Notifications from './notifications/Notifications'
import Search from './search/Search'
import Conversations from './conversation/Conversations'
import SearchResults from './conversation/SearchResults'

export default function Sidebar({onlineUsers,typing}) {
    const [searchResult, setsearchResult] = useState([])

  return (
    <div className='flex0030 max-w-[30%] h-full select-none'>
      {/*Sidebar Header*/}
        <SidebarHeader/>
     {/*Notifications*/}
     <Notifications/>
     {/*Search*/}
     <Search searchLength={searchResult.length} setsearchResult={setsearchResult}/>
     {/*Conversation*/}
   {
    searchResult.length>0?(
      <SearchResults setsearchResult={setsearchResult} searchResults={searchResult}/>
    ):(
      <Conversations typing={typing} onlineUsers={onlineUsers} />
    )
   }
     </div>
  )
}
