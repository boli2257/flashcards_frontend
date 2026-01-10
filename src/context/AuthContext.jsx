import axios from "axios";
import { useEffect, createContext, useState } from "react";

export const MyAuthContext = createContext();
export const AuthProvider = ({ children }) => { 
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(hasAccess);
  
  
 useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/protected`,  { withCredentials: true });
        setHasAccess(true)
      } catch (error) {
        console.log(error);
        setHasAccess(false);
      } finally {
        setLoading(false)
      }
    };
    checkAuth();
  }, []);
  useEffect(() => {
  console.log("hasAccess változott:", hasAccess);
}, [hasAccess]);

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
    console.log(`${import.meta.env.VITE_API_URL}/logout`);
    
    await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
    setHasAccess(false);
  };

  return (
    <MyAuthContext.Provider value={{ hasAccess, verifyKey, clearkey, loading }}>
      {children}
    </MyAuthContext.Provider>
  );
};