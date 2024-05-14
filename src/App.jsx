import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { ChatIcon } from './assets/svg'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { useSelector } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)

  const users = useSelector(state => state.user);
  
  return (
  <div className='dark' >
   
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    </div>
    
  
  )
}

export default App
