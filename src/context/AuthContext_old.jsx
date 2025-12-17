import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { sha1 } from '../utils'

export const MyUserContext = createContext()
export const MyAuthContext = createContext()
const STORED_HASH = "f7c3bc1d808e04732adf679965ccc34ca7ae3441"
const MyUserProvider = ({children}) => {
    const [hasAccess, setHasAccess] = useState(false)
    

    const verifyKey = async (key) => {
        const hash = await sha1(key)
        const result = hash === STORED_HASH 
        if(result) setHasAccess(true)
        return result 
    }

    const clearKey = (key) => {
        setHasAccess(false)
    }

  return (
    <div>
          <MyAuthContext.Provider value={{hasAccess, verifyKey, clearKey}}>
            {children}
          </MyAuthContext.Provider>
        </div>
  )
}

export default MyUserProvider
