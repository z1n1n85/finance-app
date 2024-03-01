import React, { useContext } from 'react'
import { Sun, Moon, PiggyBank } from 'lucide-react';
import { AuthContext } from 'context/auth/auth'
import { UserSettingsContext } from 'context/user-settings/user-settings';
import { Button } from 'components/UI/button';

export function Navbar() {
  const { logout, isAuth } = useContext(AuthContext);
  const { themeMode, changeTheme } = useContext(UserSettingsContext);

  return (
    <div className='fixed bg-background border-b h-14 w-screen flex justify-between items-center p-2 px-5 sm:px-12'>
      <p className='font-bold'><PiggyBank className='inline w-6 h-6 mb-1 mr-1' />BudgetBuddy</p>
      <div className='flex items-center justify-end'>
        <Button variant='ghost' size="icon" onClick={e => changeTheme()}>
          {(themeMode === 'light')
            ? <Sun />
            : <Moon />
          }
        </Button>
        {(isAuth)
          ? <Button onClick={() => logout()} className="ml-2">Выйти</Button>
          : ''
        }
      </div>
    </div>
  )
}
