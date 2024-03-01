import React, { useContext } from 'react'
import { AuthContext } from '../context/auth/auth';
import Page from 'components/UI/page';
import {
  Card,
  CardContent,
} from "components/UI/card"

export default function Activated() {
  const { user } = useContext(AuthContext);

  return (
    <Page>
      <Card className='max-w-2xl'>
        <CardContent className="pt-6 flex flex-col h-full items-start">
          <h1 className='text-xl'>Пожалуйста, активируйте аккаунт!</h1>
          <p className='mt-2'>
            Чтобы активировать аккаунт перейдите по ссылке отправленной
            на ваш адрес электронной почты: {user.email}
          </p>
          <p className='text-red-600'>
            Возможно письмо находиться в спаме!
          </p>
        </CardContent>
      </Card>
    </Page>
  )
}
