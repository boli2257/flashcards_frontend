import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { addTopic } from "../fireBaseBackend";
import { MyAuthContext } from "../context/AuthContext";

const AddTopic = () => {
  const [ topic, setTopic ] = useState();
  const navigate = useNavigate();
  const {hasAccess, clearkey} = useContext(MyAuthContext)

  console.log(topic)
  const handleSubmit = async (e) => {
    e.preventDefault()
    await addTopic(topic)
  }

  const handleLogout = () => {
    console.log("Addtopic");
    
    clearkey()
    navigate("/")
  }

  return (
    <div className="formDiv">
      <h1>{topicName || <div className="spinner"></div>}</h1>
      <form onSubmit={handleSubmit} className="topicForm">
          <h1>Témakör hozzáadása</h1>
          <input type="text" placeholder="Témakör" required onChange={(e)=>setTopic(e.target.value)}/>
          <button type="submit">Hozzáadás</button>
      </form>
          {hasAccess && <button className="logoutBtn" onClick={handleLogout}>Kilépés admin módból</button>}

    </div>

  

  )
};

export default AddTopic;
