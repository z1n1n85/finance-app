import React from 'react'
import Button from '../../../../components/UI/Button/Button'

export default function AccountItem({account, fetchAccountsDelete}) {
  return (
    <div className='Item'>
      <h2>{account.amount}</h2>
      <h3>{account.name}</h3>
      <Button onClick={() => fetchAccountsDelete(account._id)}>
        Удалить
      </Button>
    </div>
  )
}
