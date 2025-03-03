import { useState } from 'react'
import './App.css'
import LoginForm from './biblioteca/Login/components/Login'
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './biblioteca/Login/hooks/ProtectedRoute'
import Layout from './biblioteca/Core/components/Navbar'
import Usuarios from './biblioteca/Usuarios/components/Usuarios'
import Libros from './biblioteca/Libros/components/Libro'
import Autores from './biblioteca/Autor/components/Autor'
import Loans from './biblioteca/Prestamos/components/prestamos'
import Reservaciones from './biblioteca/Reservaciones/components/Reservaciones'
import Categorias from './biblioteca/Categorias/components/Categorias'

function App() {

  return (
    <>
<Routes>
  {/* Ruta de Login */}
  <Route path="/" element={<LoginForm />} />

  {/* Protegemos todo el Dashboard */}
  <Route path="/dashboard/*" element={ 
    <ProtectedRoute> 
      <Layout />
    </ProtectedRoute>
  }>
    <Route path="usuarios" element={<Usuarios />} />
    <Route path="libros" element={<Libros />} />
    <Route path="autores" element={<Autores />} />
    <Route path="prestamos" element={<Loans />} />
    <Route path="reservaciones" element={<Reservaciones />} />
    <Route path="categorias" element={<Categorias />} />
  </Route>
</Routes>

    </>
  )
} 

export default App
