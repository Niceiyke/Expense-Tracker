import React from 'react'
import TopHeader from '../components/dashboard/TopHeader'
import SideBar from '../components/SideBar'
import RightSidebar from '../components/RightSidebar'

function Dashboard() {
  return (
    <main className='flex container '>
      <section className='w-[15%]'>
        <SideBar/>
        </section>
        <section className='w-[55%]'>
        <TopHeader/> 
        </section>

        <section className='w-[30%]'>
        <RightSidebar/>
        </section>
      
      </main>
  )
}

export default Dashboard