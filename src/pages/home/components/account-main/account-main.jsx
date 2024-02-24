import React from 'react'
import AccountList from '../account-list/account-list';
import { Button } from 'components/UI/button'
import {
  Card,
  CardContent,
} from "components/UI/card"
import { Separator } from 'components/UI/separator';
import ModalAccountCreate from 'pages/home/components/modal-account-create/modal-account-create';

export default function AccountMain() {
  return (
    <Card>
      <CardContent className="pt-6">
        <ModalAccountCreate
          triggerElement={
            <Button>
              Добавить счёт
            </Button>
          }
        />
        <Separator className='my-4' />
        <AccountList />
      </CardContent>
    </Card>
  )
}
