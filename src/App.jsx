import { useState } from 'react'
import './App.css'
import LoginForm from './biblioteca/Login/components/Login'
import {Routes, Route} from 'react-router-dom'
// import ProtectedRoute from './biblioteca/Login/hooks/ProtectedRoute'
import Layout from './biblioteca/Core/components/Navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={< LoginForm/> } />
          <Route path="/Dashboard" element={<Layout/>}/>
      </Routes>
    </>
  )
} 

export default App
