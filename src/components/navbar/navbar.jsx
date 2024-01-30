import React, { useContext } from 'react'
import css from './navbar.module.css'
import { AuthContext } from '../../context/auth/auth'
import Button from '../UI/Button/Button';

export default function Navbar() {
  const {logout, isAuth} = useContext(AuthContext);

  return (
    <div className={css.navbar}>
      <p>BudgetBuddy</p>
      {(isAuth) 
      ? <Button onClick={() => logout()}>Выйти</Button>
      : ''
      }
    </div>
  )
}
