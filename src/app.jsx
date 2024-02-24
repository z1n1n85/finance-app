import React from 'react'
import AuthProvider from './context/auth/auth-provider';
import UserSettingsProvider from 'context/user-settings/user-settings-provider';
import Pages from './pages/pages';
import Navbar from './components/navbar/navbar';

export default function App() {
  return (
    <AuthProvider>
      <UserSettingsProvider>
        <Navbar/>
        <Pages/>
      </UserSettingsProvider>
    </AuthProvider>
  )
}
