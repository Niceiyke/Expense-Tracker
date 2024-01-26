"use client"
import React from 'react'
import Transactions from './Transactions'
import ButtonComponent from './ButtonComponent'

function BudgetSummary() {

    const createBudget =()=>{}
  return (
    <div className='mt-4 p-4 border '>

        <h1 className='text-center text-xl font-bold'>BudgetSummary</h1>
        <ButtonComponent text='Create Budget'onsubmit={createBudget}/>
                <Transactions/>
        
    </div>
  )
}

export default BudgetSummary