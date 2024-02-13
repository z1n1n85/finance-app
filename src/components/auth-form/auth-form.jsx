import React, {useContext, useEffect, useState} from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { AuthContext } from '../../context/auth/auth';

export default function AuthForm({authFunction, buttonText}) {
  const {error, setError} = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    setError('');
  }, []);

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        authFunction(email, password);
      }}
    >
      <Input
        placeholder='Email'
        value={email}
        onChange={e => {
          setEmail(e.target.value)
        }}
      />
      <Input
        type='password'
        placeholder='Пароль'
        value={password}
        onChange={e => {
          setPassword(e.target.value)
        }}
      />
      {
        (error)
        ? <div>
            {error}
          </div>
        : ''
      }
      <Button type='submit'> {buttonText} </Button>
    </form>
  )
}