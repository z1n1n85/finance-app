import React, { useContext } from 'react'
import AccountItem from '../account-item/account-item'
import { UserDataContext } from 'context/user-data/user-data'

export default function AccountList() {
  const { accounts, fetchAccountsDelete } = useContext(UserDataContext);

  if (!accounts || accounts.length === 0) {
    return (
      <p className='text-4xl text-center mt-8 mb-8'>Счетов нет</p>
    )
  }
  return (
    <>
      {accounts.map((account) =>
        <AccountItem
          key={account._id}
          account={account}
        />
      )}
    </>
  )
}
