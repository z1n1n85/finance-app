import React, { useContext } from 'react'
import { UserDataContext } from 'context/user-data/user-data'
import { Separator } from "components/UI/separator"
import { AccountItem } from 'pages/home/components/account-item/account-item'

export function AccountList() {
  const { accounts } = useContext(UserDataContext);

  if (!accounts || accounts.length === 0) {
    return (
      <div className='flex items-center justify-center h-full w-full'>
        <p className='text-xl text-gray-500 text-center mt-8 mb-8'>Счетов нет</p>
      </div>
    )
  }
  return (
    <div className='flex flex-col justify-start items-stretch h-full w-full'>
      {accounts.map((account) =>
        <>
          <Separator className="my-4" />
          <AccountItem
            key={account._id}
            account={account}
          />
        </>
      )}
    </div>
  )
}
