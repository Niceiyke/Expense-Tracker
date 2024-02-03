"use client"

import React, { useState,useEffect } from 'react';
import { AddExpenses, AddIncome, getCategories } from '../endpoints/apis';
import { useRouter } from 'next/navigation';

interface FormData {
  category: string;
  description: string;
  amount: number;
  date: string;

}

interface Data{
    user:string|null;
  category: string;
  description: string;
  amount: number;
  date: Date;
}


const NewIncomeForm: React.FC = () => {
  const router=useRouter()
  const [formData, setFormData] = useState<FormData>({
    category: '',
    amount: 0,
    description: '',
    date: '',
  });

  const [categories,setCategories]=useState<Category[]>([])



useEffect(() => {
  const getUserCategory = async () => {
    const res = await getCategories();
    const categories = await res.json();
    const filteredCategories = categories.filter((category:Category) => category.type === "income");
    setCategories(filteredCategories);
  };

  getUserCategory();
}, []);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle registration logic here
   
const user=localStorage.getItem('user')
const user_id:string|null =user ? JSON.parse(user).id : null;

console.log(user_id)

  const data:Data={
  category: formData.category,
  description: formData.description,
  amount: formData.amount,
  date: new Date(formData.date),
  user: user_id

}

 console.log('Form Data:', data);

    const res =await AddIncome(data)
    if (res.status ===200){
      router.push('/income')

    }

    else{
      alert("Error Occured")
    }
   
  };


  return (
<div className="min-h-screen flex items-center justify-center">
  <div className="bg-green-800 p-8 rounded shadow-md w-96">
    <h2 className="text-2xl font-bold mb-4 text-gray-100 text-center">Add Income</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-100">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-400 focus:ring focus:ring-green-400 focus:ring-opacity-50"
        >
          <option value="">Select a category</option>
          {categories.map((category)=>       
            <option value={category.id} key={category.id}>{category.name}</option>
          )}
        </select>
      </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-100">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="block w-full mt-1 border-gray-600 rounded-md shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50"
            />
          </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-100">
          Amount
        </label>
        <input
          type='number'
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-400 focus:ring focus:ring-green-400 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-100">
          Date
        </label>
        <div className="relative">
          <input
            type='date'
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-400 focus:ring focus:ring-green-400 focus:ring-opacity-50"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-700 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Add New Income
      </button>
    </form>
  </div>
</div>

  );
};

export default NewIncomeForm;
