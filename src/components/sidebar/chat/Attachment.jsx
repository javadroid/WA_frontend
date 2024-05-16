import React from 'react'
import { AttachmentIcon } from '../../../assets/svg'

export default function Attachment() {
  return (
    <li className='relative'>
      <button className='btn'>
      <AttachmentIcon className={"dark:fill-dark_svg_1"} />
      </button>
    </li>
  )
}
