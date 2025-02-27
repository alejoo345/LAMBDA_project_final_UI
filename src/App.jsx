import { useState } from 'react'
import './App.css'
import Libros from './biblioteca/Libros/components/Libro'
import LoginForm from './biblioteca/resources/components/login'
import Layout from './biblioteca/resources/components/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="app-container">
      <Layout/>
    </div>
    </>
  )
} 

export default App
