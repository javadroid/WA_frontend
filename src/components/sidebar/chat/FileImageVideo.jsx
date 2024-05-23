import React from 'react'

export default function FileImageVideo({url,type}) {
    console.log({url})

  return (
    <div className='cursor-pointer'>
      { type==="IMAGE"?<img content='' src={url} alt="" />:<video controls src={url}></video>}
    </div>
  )
}
