import React, { useEffect, useState} from 'react'
import {UserSettingsContext} from './user-settings'

export default function UserSettingsProvider({children}) {
  const [themeMode, setThemeMode] = useState('light');

  const changeTheme = () => {
    if (themeMode == 'dark'){
      setThemeMode('light');
      document.body.classList.remove('dark');
      document.documentElement.setAttribute(
        "data-color-scheme", "light"
      );
      localStorage.removeItem('themeMode');
    } else {
      setThemeMode('dark');
      document.body.classList.add('dark');
      document.documentElement.setAttribute(
        "data-color-scheme", "dark"
      );
      localStorage.setItem('themeMode', 'dark');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('themeMode') && themeMode === 'light'){
      changeTheme();
    }
  }, []);

  return (
    <UserSettingsContext.Provider value={{
      themeMode,
      changeTheme,
    }}>
      {children}
    </UserSettingsContext.Provider>
  )
}
