import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Topic from './pages/Topic'
import AddTopic from './pages/AddTopic'
import AddCard from './pages/AddCard'
import MyFlashCard from './components/MyFlashCard'
import Header from './components/Header'

function App() {
  

  return (
    <div className="container">
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/topics' element={<Topic/>}/> 
          <Route path='/addTopic' element={<AddTopic/>}/> 
          <Route path='/topics/:id' element={<MyFlashCard/>}/>
          <Route path='/addCard/:id' element={<AddCard/>}/> 
        </Routes>

    </div>
  )
}

export default App
