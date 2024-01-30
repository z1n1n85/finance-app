import React, { useContext } from 'react'
import AccountItem from '../account-item/account-item'
import { UserDataContext } from '../../../../context/user-data/user-data'

export default function AccountList() {
  const {accounts, fetchAccountsDelete} = useContext(UserDataContext);
  
  if (!accounts || accounts.length === 0) {
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
        />
      )}
    </div>
  )
}
