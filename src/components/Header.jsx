import React from 'react'
import { useNavigate } from 'react-router'
import { FaHouseChimney } from "react-icons/fa6";

const Header = () => {
    const navigate = useNavigate()

  return (
    <div className='header'>
        <span onClick={()=>navigate("/")}><FaHouseChimney size={25}/></span>
    </div>
  )
}

export default Header
