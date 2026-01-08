import axios from "axios";
import { useEffect, createContext, useState } from "react";

// 1. Ez a Context objektum - ezt használod a useContext-ben
export const MyAuthContext = createContext();

// 2. Ez a Provider komponens - ezt használod a main.jsx-ben
export const AuthProvider = ({ children }) => { 
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Javítás: import.meta.env-et kell használni Vite-nél, nem .process.env-et
        await axios.get(`${import.meta.env.VITE_API_URL}/protected`,  { withCredentials: true });
   
      } catch (error) {
        console.log(error);
        setHasAccess(false);
      } finally {
        setLoading(false); // Itt hiányzott a false érték és a hívás
      }
    };
    checkAuth();
  }, []);
console.log(hasAccess);

  const verifyKey = async (key) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/login`, { key }, { withCredentials: true });
      setHasAccess(true);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const clearkey = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
    setHasAccess(false);
  };

  return (
    <MyAuthContext.Provider value={{ hasAccess, verifyKey, clearkey, loading }}>
      {children}
    </MyAuthContext.Provider>
  );
};