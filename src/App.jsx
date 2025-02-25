import { useState } from 'react'
import './App.css'
import Libros from './modules/Libros/components/libros'
import Autor  from './modules/Autor/components/Autor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Libros/>
      <Autor/>
    </>
  )
} 

export default App
