import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../utils/redux/features/useSlice'

export default function Home() {
    const dispatch=useDispatch()
    function open(){
        dispatch(logout())
    }
  return (
    <div onClick={()=>open()}>
    hel
    </div>
  )
}
