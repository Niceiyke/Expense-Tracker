
import NewIncomeForm from '@/app/components/AddNewIncome'
import RightSidebar from '@/app/components/RightSidebar'
import SideBar from '@/app/components/SideBar'
import { SplitLayout } from '@/app/layout/SplitScreen'




import React from 'react'

function AddIncome() {
  return (
    <SplitLayout left={<SideBar/>} center={<NewIncomeForm/>} right={<RightSidebar/>}/>
  )
}

export default AddIncome