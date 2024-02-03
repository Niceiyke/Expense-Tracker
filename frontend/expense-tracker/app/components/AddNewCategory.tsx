"use client"

import React, { useState,useEffect } from 'react';
import { AddCategory } from '../endpoints/apis';
import { useRouter } from 'next/navigation';

interface FormData {
  type: string;
  name: string;


}

interface Data{
    user_id:string|null;
  type: string;
  name: string;

}


const NewCategoryForm: React.FC = () => {
  const router=useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle registration logic here
   
const user=localStorage.getItem('user')
const user_id:string|null =user ? JSON.parse(user).id : null;

  const data:Data={
  name: formData.name,
  type: formData.type,
  user_id: user_id

}

 console.log('Form Data:', data);

    const res =await AddCategory(data)
    if (res.status ===200){
      router.push('/dashboard')

    }

    else{
      alert("Error Occured")
    }
   
  };


  return (
<div className="min-h-screen flex items-center justify-center">
  <div className="bg-green-800 p-8 rounded shadow-md w-96">
    <h2 className="text-2xl font-bold mb-4 text-gray-100 text-center">Add Category</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-100">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-400 focus:ring focus:ring-green-400 focus:ring-opacity-50"
        >
          <option value="">Select a category type</option>
         
          <option value="income">Income</option>
          <option value="expenses">Expenses</option>
  
        </select>
        </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-100">
          Name
        </label>
        <input
          type='text'
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-400 focus:ring focus:ring-green-400 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-blue active:bg-green-600"
      >
        Add New Category
      </button>
    </form>
  </div>
</div>

  );
};

export default NewCategoryForm;
