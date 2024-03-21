import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Menu from "./components/pages/Menu";
import RegistrarUsuario from './components/pages/RegistrarUsuario'
import NuevoEmpleado from './components/pages/NuevoEmpleado'
import ConsultaEliminacionEmpleado from './components/pages/ConsultaEliminacionEmpleado'
const App = () => {
  const [usuario, setUsuario] = useState('');

  const handleLogin = (username) => {
    setUsuario(username);
  };

  return (

    <BrowserRouter>
 
      <main className="main-content">

      <Routes>
       <Route path='/' element={<Login onLogin={handleLogin} />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/RegistrarUsuario" element={<RegistrarUsuario/>}></Route>
        <Route path="/NuevoEmpleado" element={<NuevoEmpleado/>}></Route>
        <Route path="/ConsultaEliminacionEmpleado" element={<ConsultaEliminacionEmpleado/>}></Route>
      </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
