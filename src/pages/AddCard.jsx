import React, { useContext, useState } from 'react'
import { addCard, readCardsOnce} from '../fireBaseBackend'
import { useNavigate, useParams } from 'react-router'
import { MyAuthContext } from '../context/AuthContext'
import { readTopicOnce } from '../fireBaseBackend'
import { useEffect } from 'react'
const AddCard = () => {

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const {hasAccess, clearkey} = useContext(MyAuthContext)
  const {id} = useParams()
  const navigate = useNavigate()
  const [topicName, setTopicName] = useState('')
  const [cards, setCards] = useState([])
    useEffect(() => {
      readCardsOnce(id, setCards)
      readTopicOnce(id, setTopicName)
    }, [id])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    let inputData = {question, answer}
    console.log(inputData)
    await addCard(id, inputData)
    navigate("/topics")
  }

  const handleLogout = () => {
    console.log("Addcard");
    clearkey()
    navigate("/")
  }

  return (
      <div className='formDiv'>
        <form onSubmit={handleSubmit} className='cardForm'>
          <h1 style={{width:"100px"}}>{topicName || <div className="spinner"></div>}</h1>
          <h3>Kártya hozzáadása</h3>
            <input type='text' placeholder='Kérdés' required onChange={(e)=>setQuestion(e.target.value)}></input>
            <input type='text' placeholder='Válasz' required onChange={(e)=>setAnswer(e.target.value)}></input>
            <button type="submit">Hozzáadás</button>
        </form>
        {hasAccess && <button className="logoutBtn" onClick={handleLogout}>Kilépés admin módból</button>}
      </div>
    
  )
}

export default AddCard
