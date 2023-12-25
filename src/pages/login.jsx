import React, {useContext} from 'react'
import { Link } from 'react-router-dom';

import Input from '../components/UI/Input/Input'
import Button from '../components/UI/Button/Button'
import { AuthContext } from '../context/auth';

export default function Register() {
  const {setIsAuth} = useContext(AuthContext);

  return (
    <>
      <Input placeholder='Имя пользователя'/>
      <Input placeholder='Пароль'/>
      <Button onClick={() => setIsAuth(true)}>
        Войти
      </Button>
      <Link to='/signup'>Ещё нет аккаунта?</Link>
    </>
  )
}
