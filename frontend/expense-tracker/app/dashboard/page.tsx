
import React from 'react'
import SideBar from '../components/SideBar'
import RightSidebar from '../components/RightSidebar'
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