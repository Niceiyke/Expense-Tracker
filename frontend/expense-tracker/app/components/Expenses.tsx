
import React from 'react'
import { getUserExpenses } from '../endpoints/apis'
import ExpensesCard from '../components/ExpensesCard'
import Link from 'next/link'


async function Expanses() {
    const res= await getUserExpenses()

    const expenses =await res.json()


  return (
    
<main className='container mx-auto flex flex-col'>
    <div className="flex justify-end">
    <Link href='/expenses/add'>
      <button className="border p-4 mr-4 mt-4 rounded bg-green-800 text-md text-gray-100">Add Expenses</button>
    </Link>
  </div>
  <div className="items-center">
    <ExpensesCard expenses={expenses}/>
  </div>

</main>

    
  )
}

export default Expanses