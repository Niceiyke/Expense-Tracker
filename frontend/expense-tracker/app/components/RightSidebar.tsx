import React from 'react'
import RecentExpenses from './RecentExpenses'
import RecentIncomes from './RecentIncomes'

function RightSidebar() {
  return (
    <div className='mt-4 ml-4'>

        <RecentIncomes/>

        <RecentExpenses/>
        
       
    </div>
  )
}

export default RightSidebar