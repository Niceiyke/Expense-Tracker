
import React from 'react'
import { getUserIncome } from '../endpoints/apis'
import IncomeCard from './IncomeCard'
import Link from 'next/link'


async function Incomes() {
    const res= await getUserIncome()

    const income =await res.json()


  return (
    
<main className='container mx-auto flex flex-col'>
    <div className="flex justify-end">
    <Link href='/income/add'>
      <button className="border p-4 mr-4 mt-4 rounded bg-green-800 text-md text-gray-100">Add Income</button>
    </Link>
  </div>
  <div className="items-center">
    <IncomeCard incomes={income}/>
  </div>

</main>

    
  )
}

export default Incomes