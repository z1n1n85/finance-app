import React from 'react'
import Button from './UI/Button/Button'

export default function AccountItem({account, removeAccount}) {
  return (
    <div className='Item'>
      <h2>{account.amount}</h2>
      <h3>{account.name}</h3>
      <Button onClick={() => removeAccount(account.id)}>
        Удалить
      </Button>
    </div>
  )
}
