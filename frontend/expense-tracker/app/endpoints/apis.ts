
const BASEURL="http://127.0.0.1:8000/api"

interface NewUser{
    email:string;
    first_name:string;
    last_name:string;
    password:string

}

interface ExpensesProp{
    category:string;
    amount:number;
    description:string;
    date:Date;
    user:string|null;
}

interface IncomeProp{
    category:string;
    amount:number;
    description:string;
    date:Date;
    user:string|null;
}
interface CategoryProp{
    name:string;
    type:string;
    user_id:string|null;
}

export const RegisterUser =async (user:NewUser)=>{
    const res =await fetch(`${BASEURL}/account/register`,{
        method: 'POST',
         headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user),
    })

    if (res.status ===200){
        return res.json()
    }
}

interface LoginProp{
    email:string;
    password:string
}

export const LoginUser =async(userDetail:LoginProp)=>{

        const res =await fetch(`${BASEURL}/account/login`,{
        method: 'POST',
         headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(userDetail),

    })

        return res
    

}

export const AddExpenses =async(expenses:ExpensesProp)=>{

        const res =await fetch(`${BASEURL}/expenses/create-expenses`,{
        method: 'POST',
         headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(expenses),

    })

        return res
}

export const getUserExpenses =async ()=>{
    const res =await fetch(`${BASEURL}/expenses/list-expenses`,{cache:'no-store'})
        return res
}


export const getUserIncome =async ()=>{
    const res =await fetch(`${BASEURL}/income/list-incomes`,{cache:'no-store'})
        return res
}

export const AddIncome =async(income:IncomeProp)=>{

        const res =await fetch(`${BASEURL}/income/create-income`,{
        method: 'POST',
         headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(income),

    })

        return res
}

export const getCategories =async ()=>{
    const res =await fetch(`${BASEURL}/category/categories`)
        return res
}

export const AddCategory=async(category:CategoryProp)=>{

        const res =await fetch(`${BASEURL}/category/add-category`,{
        method: 'POST',
         headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(category),

    })

        return res
}