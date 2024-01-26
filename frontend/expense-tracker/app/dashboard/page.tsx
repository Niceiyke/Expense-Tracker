import React from 'react'
import TopHeader from '../components/dashboard/TopHeader'
import SideBar from '../components/SideBar'
import RightSidebar from '../components/RightSidebar'
import Transactions from '../components/Transactions'
import { SplitLayout } from '../layout/SplitScreen'
import MainBar from '../components/MainBar'

function Dashboard() {
  return (
    <div className=''>

      <SplitLayout left={<SideBar/>} center={<MainBar/>} right={<RightSidebar/>}/>

      
      </div>
  )
}

export default Dashboard