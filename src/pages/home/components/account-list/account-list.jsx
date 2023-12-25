import React from 'react'
import AccountItem from '../account-item/account-item'

export default function AccountList({accounts, fetchAccountsDelete}) {
  if (!accounts) {
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
          key={account._id}
          account={account}
          fetchAccountsDelete={fetchAccountsDelete}
        />
      )}
    </div>
  )
}
