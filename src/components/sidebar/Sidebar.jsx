import React, { useState } from 'react'
import SidebarHeader from './header/SidebarHeader'
import Notifications from './notifications/Notifications'
import Search from './search/Search'
import Conversations from './conversation/Conversations'
import SearchResults from './conversation/SearchResults'

export default function Sidebar() {
    const [searchResult, setsearchResult] = useState([])
    console.log(searchResult)
  return (
    <div className='w-[40%] h-full select-none'>
      {/*Sidebar Header*/}
        <SidebarHeader/>
     {/*Notifications*/}
     <Notifications/>
     {/*Search*/}
     <Search searchLength={searchResult.length} setsearchResult={setsearchResult}/>
     {/*Conversation*/}
   {
    searchResult.length>0?(
      <SearchResults searchResults={searchResult}/>
    ):(
      <Conversations />
    )
   }
     </div>
  )
}
