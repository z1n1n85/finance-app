import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/UI/card";
import { Input } from 'components/UI/input';
import { Button } from 'components/UI/button';
import { AuthContext } from '../../context/auth/auth';
import { Switch } from 'components/UI/switch';

export default function AuthForm({ authFunction, buttonText, title, footerText, footerLinkText, footerLink }) {
  const { error, setError } = useContext(AuthContext);
  const [passInputType, setPassInputType] = useState('password');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const changePassInputType = () => {
    (passInputType == 'password')
    ? setPassInputType('text')
    : setPassInputType('password')
  }

  useEffect(() => {
    setError('');
  }, []);

  return (
    <Card className='lg:w-2/5'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            authFunction(email, password);
          }}
        >
          <Input
            className='mb-4'
            placeholder='Email'
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          <Input
            className='mb-4'
            type={passInputType}
            placeholder='Пароль'
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <div className='flex items-center mb-4'>
            <Switch
              className='mr-2'
              onCheckedChange={changePassInputType}
            />
            <p>Показать пароль</p>
          </div>
          {
            (error)
              ? <div className='text-red-600 flex items-center mb-4'>
                <p>{error}</p>
              </div>
              : ''
          }
          <Button type='submit' className='w-full'> {buttonText} </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p>{footerText} <Link to={footerLink} className='font-bold text-primary hover:underline'>{footerLinkText}</Link></p>
      </CardFooter>
    </Card>
  )
}