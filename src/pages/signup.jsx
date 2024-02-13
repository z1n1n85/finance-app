import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/auth';
import AuthForm from '../components/auth-form/auth-form';

export default function Signin() {
  const {registration} = useContext(AuthContext);

  return (
    <div className='page auth'>
      <h1>Регистрация</h1>
      <AuthForm authFunction={registration} buttonText='Зарегистрироваться'/>
      <Link to='/login'>Зарегистрированы?</Link>
    </div>
  )
}
