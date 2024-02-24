import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from 'context/auth/auth';
import AuthForm from 'components/auth-form/auth-form';
import Page from 'components/UI/page'

export default function Signin() {
  const {registration} = useContext(AuthContext);

  return (
    <Page>
      <AuthForm
        authFunction={registration}
        title='Регистрация'
        buttonText='Зарегистрироваться'
        footerText='Уже есть аккаунт?'
        footerLinkText='Авторизируйтесь!'
        footerLink='/login'
      />
    </Page>
  )
}
