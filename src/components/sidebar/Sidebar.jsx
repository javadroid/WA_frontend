import React, { useState } from 'react'
import SidebarHeader from './header/SidebarHeader'
import Notifications from './notifications/Notifications'
import Search from './search/Search'

export default function Sidebar() {
    const [searchResult, setsearchResult] = useState([])
  return (
    <div className='w-[40%] h-full select-none'>
      {/*Sidebar Header*/}
        <SidebarHeader/>
     {/*Notifications*/}
     <Notifications/>
     {/*Search*/}
     <Search searchLength={searchResult.length}/>
    </div>
  )
}
