import React from 'react'
import AccountList from '../account-list/account-list';
import { Button } from 'components/UI/button'
import {
  Card,
  CardContent,
} from "components/UI/card"
import ModalAccountCreate from 'pages/home/components/modal-account-create/modal-account-create';

export default function AccountMain() {
  return (
    <Card>
      <CardContent className="pt-6 flex flex-col h-full items-start">
        <ModalAccountCreate
          triggerElement={
            <Button>
              Добавить счёт
            </Button>
          }
        />
        <AccountList />
      </CardContent>
    </Card>
  )
}
