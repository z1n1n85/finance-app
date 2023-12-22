import React from 'react'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/Button/Button'

export default function Register() {
  return (
    <div>
      <Input placeholder='Имя пользователя'/>
      <Input placeholder='Пароль'/>
      <Button>Зарегистрироваться</Button>
    </div>
  )
}
