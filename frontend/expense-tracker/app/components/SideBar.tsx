import React from 'react'
import IconBtn from './IconComponent'
import {  MdDashboard,MdCurrencyExchange,MdCorporateFare,MdRequestQuote,MdPlaylistAddCircle } from "react-icons/md";
import Link from 'next/link';

function SideBar() {
  return (
    <div className='mt-4'>
        <Link href='/dashboard'><IconBtn icon={<MdDashboard size={'30'}/>} name='dashboard'/></Link>
        <Link href='/budget'><IconBtn icon={<MdCurrencyExchange size={'30'}/>} name='budget'/></Link>
        <IconBtn icon={<MdCorporateFare size={'30'}/>} name='expenses'/>
        <IconBtn icon={<MdPlaylistAddCircle size={'30'}/>} name='income'/>
        <IconBtn icon={<MdRequestQuote size={'30'}/>} name='Report'/>
    </div>
  )
}

export default SideBar