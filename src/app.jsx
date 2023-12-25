import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from './context/auth';
import Home from './pages/home/home';
import Signup from './pages/signup';
import Login from './pages/login';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
    }}>
      <BrowserRouter>
      {(isAuth)
        ?
        <>
          <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path="*" element={<Navigate to ="/home" replace={true}/>}/>
          </Routes>
        </>
        :
        <>
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="*" element={<Navigate to ="/login" replace={true}/>}/>
          </Routes>
        </>
      }
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
