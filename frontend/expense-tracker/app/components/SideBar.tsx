import React from 'react'
import IconBtn from './IconComponent'
import {  MdDashboard,MdCurrencyExchange,MdCorporateFare,MdRequestQuote,MdPlaylistAddCircle } from "react-icons/md";

function SideBar() {
  return (
    <div className='mt-4'>
        <IconBtn icon={<MdDashboard size={'30'}/>} name='dashboard'/>
        <IconBtn icon={<MdCurrencyExchange size={'30'}/>} name='budget'/>
        <IconBtn icon={<MdCorporateFare size={'30'}/>} name='expenses'/>
        <IconBtn icon={<MdPlaylistAddCircle size={'30'}/>} name='income'/>
        <IconBtn icon={<MdRequestQuote size={'30'}/>} name='Report'/>
    </div>
  )
}

export default SideBar