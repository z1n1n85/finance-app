import React from 'react'
import AuthProvider from './context/auth/auth-provider';
import Pages from './pages/pages';
import Navbar from './components/navbar/navbar';

export default function App() {
  return (
    <AuthProvider>
      <Navbar/>
      <Pages/>
    </AuthProvider>
  )
}
