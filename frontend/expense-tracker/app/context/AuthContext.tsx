"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoginUser } from '../endpoints/apis';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs'

interface UserProp {
  email: string;
  password: string;
}

interface TokenPayload {
  id: string;
  exp: number;
  iat: number;
}

interface AuthContextType {
  user: TokenPayload | null;
  login: (userData: UserProp) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TokenPayload | null>(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null);
  const router = useRouter();

  useEffect(() => {
    const tokenData= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;

    console.log(tokenData)
    
    if (tokenData==null) {
      router.push('/login')
    }

  }, []);

  const login = async (userData: UserProp) => {
    console.log("clicked")
      const res =await LoginUser(userData)

    if (res.status===200){
        const token =await res.json()
        setUser(jwtDecode(token.jwt))
        localStorage.setItem('user',JSON.stringify(jwtDecode(token.jwt)))
        Cookies.set('user-token',token.jwt)
        router.push('/dashboard')
    }

    else {
        alert('error loging in check email or password')
    }

  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
