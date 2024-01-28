import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


// Create a custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
