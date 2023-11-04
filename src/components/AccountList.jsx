import React from 'react'
import AccountItem from './AccountItem'

export default function AccountList({accounts, removeAccount}) {
  if (!accounts.length) {
    return (
      <div className='List'>
        <h1 className='Header'>Счетов нет</h1>
      </div>
    )
  }
  return (
    <div className='List'>
      {accounts.map((account) => 
        <AccountItem
          key={account.id}
          account={account}
          removeAccount={removeAccount}
        />
      )}
    </div>
  )
}
