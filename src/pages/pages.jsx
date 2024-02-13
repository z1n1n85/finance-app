import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from './home/home';
import Signup from './signup';
import Login from './login';
import Activated from './activated';
import { AuthContext } from '../context/auth/auth';

export default function Pages() {
  const {isAuth, user} = useContext(AuthContext);

  return (
      <BrowserRouter>
      {(!isAuth)
        ?
        <>
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="*" element={<Navigate to ="/login" replace={true}/>}/>
          </Routes>
        </>
        : (!user.isActivated)
          ?
          <>
            <Routes>
              <Route path="/activated" element={<Activated/>}/>
              <Route path="*" element={<Navigate to ="/activated" replace={true}/>}/>
            </Routes>
          </>
          :
          <>
            <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="*" element={<Navigate to ="/home" replace={true}/>}/>
            </Routes>
          </>
      }
      </BrowserRouter>
  )
}
