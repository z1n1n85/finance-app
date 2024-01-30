import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom';

import Input from '../components/UI/Input/Input'
import Button from '../components/UI/Button/Button'
import { AuthContext } from '../context/auth/auth';

export default function Register() {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className='page auth'>
      <Input
        placeholder='Email'
        value={email}
        onChange={e => {
          setEmail(e.target.value)
        }}
      />
      <Input
        placeholder='Пароль'
        value={password}
        onChange={e => {
          setPassword(e.target.value)
        }}
      />
      <Button onClick={() => login(email, password)}>
        Войти
      </Button>
      <Link to='/signup'>Ещё нет аккаунта?</Link>
    </div>
  )
}
