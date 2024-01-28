
interface IncomeProp{
incomes:Income[]
}

const IncomeCard:React.FC<IncomeProp>=({incomes})=>{

    return(
        
            <section>
    <div className="container mx-auto p-4">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Description</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date</th>

        </tr>
      </thead>
            <tbody className="bg-white divide-y divide-gray-200">
      
       {incomes.map((income:Income)=> 
        <tr key={income.id} className="transition-all hover:bg-gray-100">
          <td className="px-6 py-4 whitespace-no-wrap">{ income.category?.name }</td>
          <td className="px-6 py-4 whitespace-no-wrap">{ income.description }</td>
          <td className="px-6 py-4 whitespace-no-wrap">{ income.amount }</td>
          <td className="px-6 py-4 whitespace-no-wrap">{ income.date }</td>

        </tr>
        )}
      </tbody>
    </table>
  </div>
            </section>
      
    )

}


export default IncomeCard