import NewExpenseForm from '@/app/components/AddNewExpense'
import RightSidebar from '@/app/components/RightSidebar'
import SideBar from '@/app/components/SideBar'
import { SplitLayout } from '@/app/layout/SplitScreen'




import React from 'react'

function AddExpenses() {
  return (
    <SplitLayout left={<SideBar/>} center={<NewExpenseForm/>} right={<RightSidebar/>}/>
  )
}

export default AddExpenses