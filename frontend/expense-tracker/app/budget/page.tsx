import React from 'react'
import { SplitLayout } from '../layout/SplitScreen'
import SideBar from '../components/SideBar'
import Budget from '../components/Budget'
import RightSidebar from '../components/RightSidebar'

function BudgetPage() {
  return (
    <div><SplitLayout left={<SideBar/>} center={<Budget/>} right={<RightSidebar/>}/></div>
  )
}

export default BudgetPage