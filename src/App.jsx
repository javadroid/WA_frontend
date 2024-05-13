import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChatIcon } from './assets/svg'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>Welcome to 
   <ChatIcon/>
   
   </div>
  )
}

export default App
