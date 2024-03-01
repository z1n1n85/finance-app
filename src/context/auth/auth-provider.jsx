import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AuthService from 'api/auth';
import { AuthContext } from 'context/auth/auth';

export function AuthProvider({children}) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

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
      setError('');
    } catch (e) {
      console.log(e.response.data.message, e.response.data.errors);
      setError(e.response.data.message);
    }
  }

  async function registration(email, password){
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      updateAuth(true);
      setUser(response.data.user);
      setError('');
    } catch (e) {
      console.log(e.response.data.message, e.response.data.errors);
      setError(e.response.data.message);
    }
  }

  async function logout(){
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      updateAuth(false);
      setUser({});
      return response;
    } catch (e) {
      console.log(e.response.data.message, e.response.data.errors);
    }
  }

  async function checkAuth() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_API}refresh`, {withCredentials: true});
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{
      error,
      setError,
      isAuth,
      user,
      updateAuth,
      login,
      registration,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
