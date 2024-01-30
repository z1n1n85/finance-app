import React, { useContext } from 'react'
import Button from '../../../../components/UI/Button/Button'
import { UserDataContext } from '../../../../context/user-data/user-data'

export default function AccountItem({account}) {
  const {fetchAccountsDelete} = useContext(UserDataContext);

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
