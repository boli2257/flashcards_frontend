import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AccessKeyModal from "../components/AccessKeyModal";
import { MyAuthContext } from "../context/AuthContext";

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { hasAccess } = useContext(MyAuthContext);
  const handleAddTopic = () => {

      if(hasAccess){
        navigate("/addTopic")
      }else {
        setOpen(true)
      }

  }
  return (
    <div className="Home">
      <button onClick={handleAddTopic}>
        Témakörök hozzáadása
      </button>
      <button onClick={() => navigate("/topics")}>Témakörök</button>
      <AccessKeyModal open={open} onClose={()=>setOpen(false)} onSuccess={()=>navigate('/addTopic')}/>


    </div>
  );
};

export default Home;
