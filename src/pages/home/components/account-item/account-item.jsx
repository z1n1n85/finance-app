import React, { useContext } from 'react'
import { CreditCard } from 'lucide-react';
import {Button} from 'components/UI/button'
import { UserDataContext } from '../../../../context/user-data/user-data'

export default function AccountItem({account}) {
  const {fetchAccountsDelete} = useContext(UserDataContext);

  return (
    <>
      <h2 className='text-lg font-bold'>{account.amount} ₽</h2>
      <h3 className='font-medium'><CreditCard className='w-5 h-5 inline mr-1'/>{account.name}</h3>
      <Button variant="destructive" className='px-2 py-1 text-xs h-8 mt-2' onClick={() => fetchAccountsDelete(account._id)}>
        Удалить
      </Button>
    </>
  )
}
