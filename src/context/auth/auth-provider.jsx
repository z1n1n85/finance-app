import React, { useEffect, useState } from 'react'
import { AuthContext } from './auth';
import AuthService from '../../api/auth';
import axios from 'axios';
import { SERVER_API } from '../../const/access';

export default function AuthProvider({children}) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  const updateAuth = (updateIsAuth) => {
    localStorage.setItem('isAuth', `${updateIsAuth}`);
    setIsAuth(updateIsAuth);
  }

  async function login(email, password){
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      updateAuth(true);
      setUser(response.data.user);
    } catch (e) {
      console.log(e.response.message);
    }
  }

  async function registration(email, password){
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      updateAuth(true);
      setUser(response.data.user);
    } catch (e) {
      console.log(e.response.message);
    }
  }

  async function logout(){
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      updateAuth(false);
      setUser({});
    } catch (e) {
      console.log(e.response.message);
    }
  }

  async function checkAuth() {
    try {
      const response = await axios.get(`${SERVER_API}refresh`, {withCredentials: true});
      localStorage.setItem('token', response.data.accessToken);
      updateAuth(true);
      setUser(response.data.user);
    } catch (e) {
      
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')){
      checkAuth();
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      user,
      setIsAuth,
      updateAuth,
      login,
      registration,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
