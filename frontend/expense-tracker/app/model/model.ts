interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface Category{
    id:string;
    user:string;
    name:string;
}

interface expenses {
  id: string;
  user: UserData;
  amount: number;
  description: string;
  date: string;
  created_at: string;
  category: Category | null;
}

interface Income {
  id: string;
  user: UserData;
  amount: number;
  description: string;
  date: string;
  created_at: string;
  category: Category | null;
}