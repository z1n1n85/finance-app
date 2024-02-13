import React, { useContext } from 'react'
import { AuthContext } from '../context/auth/auth';

export default function Activated() {
  const {user} = useContext(AuthContext);

  return (
    <>
      <h1>Пожалуйста, активируйте аккаунт!</h1>
      <p>Чтобы активировать аккаунт перейдите по ссылке отправленной на ваш адрес электронной почты: {user.email}</p>
    </>
  )
}
