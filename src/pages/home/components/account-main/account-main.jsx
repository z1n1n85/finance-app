import React from 'react'
import { Button } from 'components/UI/button'
import {
  Card,
  CardContent,
} from "components/UI/card"
import { AccountList } from 'pages/home/components/account-list/account-list';
import { ModalAccountCreate } from 'pages/home/components/modal-account-create/modal-account-create';

export function AccountMain() {
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
