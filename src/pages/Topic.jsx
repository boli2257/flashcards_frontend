import React, {  useEffect, useState } from "react";
import { MyAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { readTopicsOnce } from "../fireBaseBackend";

const Topic = () => {
  
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  console.log(topics);
  useEffect(() => {
    readTopicsOnce(setTopics);
  }, []);

  return (
    <div className="topics">
      {topics &&
        topics.map((obj) => (
          <button onClick={() => navigate("/topics/" + obj.id)} key={obj.id}>
            {obj.name}
          </button>
        ))}
        
    </div>
  );
};

export default Topic;
