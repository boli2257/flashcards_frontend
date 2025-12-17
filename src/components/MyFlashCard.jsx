import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { deleteCard, deleteTopic, readCardsOnce } from '../fireBaseBackend'
import MyFlipCard from './MyFlipCard'
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { MyAuthContext } from '../context/AuthContext';
import AccessKeyModal from './AccessKeyModal';

const MyFlashCard = () => {
    const [cards, setCards] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const navigate = useNavigate();
    const {hasAccess} = useContext(MyAuthContext)
    const {id} = useParams()

    cards && console.log(cards[currentIndex])
    console.log(id, "azzazaz")
    useEffect(()=>{
        readCardsOnce(id, setCards)    
    }, [])

    const swipeLeft = () => {
        console.log(cards.length);
        
        setCurrentIndex(prev => prev != cards.length-1 ? prev+=1 : prev-=cards.length-1)
    }
    const swipeRight = () => {
        setCurrentIndex(prev => prev != 0 ? prev-=1 : prev+=cards.length-1)
    }

    const handleAddCard = () => {
      if(hasAccess){
        navigate("/addCard/"+id)
      }else {
        setOpen(true)
      }
    }
    
    const handleDeleteCard = () => {
      console.log(id, cards[currentIndex].id, "asdasdasdasd")
      console.log(hasAccess)
      if(hasAccess){
        deleteCard(id, cards[currentIndex].id)
      }else {
        setOpen2(true)
      }
    }
    const handleDeleteTopic = () => {
      if(hasAccess){
        deleteTopic(id)
        navigate("/topics")
      }else {
        setOpen3(true)
      }
    }
    
  return (
    <div className='Flashcards'>
      {/* <select className='dropdown'>
        <option value="addCard" className='addBtn' onClick={handleAddCard}>Új kártya hozzáadása</option>
        <option value="deleteCard" className='delBtn' onClick={handleDeleteCard}>Kártya törlése</option>
        <option value="deleteTopic" className='delBtn delTopicBtn' onClick={handleDeleteTopic}>Témakör törlése</option>
      </select> */}
      <button onClick={handleAddCard} className='addBtn'>Új kártya hozzáadása</button>
      <button onClick={handleDeleteCard} className='delBtn'>Kártya törlése</button>
      <button onClick={handleDeleteTopic} className='delBtn delTopicBtn'>Témakör törlése</button>

        {cards.length > 0 ? <MyFlipCard currentCard={cards[currentIndex]} currentIndex={currentIndex}/> : <p>Nincsenek kérdések ehhez a témakörhöz</p>}
      {/* {cards && cards.length > 0 && cards.map(obj=><MyFlipCard {...obj}/>)}   */}
      <div className='ArrowsHolder'>
        <span  onClick={swipeRight} className='Arrows'>
            <FaArrowLeft />
        </span>
                   
        <span  onClick={swipeLeft} className='Arrows'>
            <FaArrowRight />
        </span>
      </div>
      <AccessKeyModal open={open} onClose={()=>setOpen(false)} onSuccess={()=>navigate('/addCard/'+id)}/>
      <AccessKeyModal open={open2} onClose={()=>setOpen2(false)} onSuccess={()=> navigate('/topics/' + id)}/>
        <AccessKeyModal open={open3} onClose={()=>setOpen3(false)} onSuccess={()=> navigate('/topics')}/>
    </div>
  )
}

export default MyFlashCard
