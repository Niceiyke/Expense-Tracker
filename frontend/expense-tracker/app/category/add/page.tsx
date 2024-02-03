import NewCategoryForm from '@/app/components/AddNewCategory'
import RightSidebar from '@/app/components/RightSidebar'
import SideBar from '@/app/components/SideBar'
import { SplitLayout } from '@/app/layout/SplitScreen'




import React from 'react'

function AddCategory() {
  return (
    <SplitLayout left={<SideBar/>} center={<NewCategoryForm/>} right={<RightSidebar/>}/>
  )
}

export default AddCategory