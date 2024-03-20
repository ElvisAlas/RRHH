import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
 import News from "./components/pages/News";
// import NavbarHook from "./components/NavbarHook/NavbarHook";

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
        <Route path="/news" element={<News />} />
      </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
