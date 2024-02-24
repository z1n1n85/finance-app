import React, {useContext} from 'react'
import { AuthContext } from 'context/auth/auth';
import AuthForm from 'components/auth-form/auth-form';
import Page from 'components/UI/page'

export default function Register() {
  const {login} = useContext(AuthContext);

  return (
    <Page>
      <AuthForm
        authFunction={login}
        title='Авторизация'
        buttonText='Войти'
        footerText='Ещё нет аккаунта?'
        footerLinkText='Зарегистрируйтесь!'
        footerLink='/signup'
      />
    </Page>
  )
} 
