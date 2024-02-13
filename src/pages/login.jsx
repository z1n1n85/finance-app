import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/auth';
import AuthForm from '../components/auth-form/auth-form';

export default function Register() {
  const {login} = useContext(AuthContext);

  return (
    <div className='page auth'>
      <h1>Авторизация</h1>
      <AuthForm authFunction={login} buttonText='Войти'/>
      <Link to='/signup'>Ещё нет аккаунта?</Link>
    </div>
  )
}
