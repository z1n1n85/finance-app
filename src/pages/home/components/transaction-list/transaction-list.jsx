import React from 'react'
import TransactionItem from '../transaction-item/transaction-item'
import { useContext } from 'react'
import { UserDataContext } from '../../../../context/user-data/user-data'

export default function TransactionList({
  setVisibleFormUpdate,
  setTransactionsUpdate,
}) {
  const {sortedTransactions} = useContext(UserDataContext);

  if (!sortedTransactions || sortedTransactions.length === 0) {
    return (
      <div className='List'>
        <h1 className='Header'>Операций нет</h1>
      </div>
    )
  }
  return (
    <div className='List'>
      {sortedTransactions.map((transaction) => 
        <TransactionItem
          key={transaction._id}
          transaction={transaction}
          setVisibleFormUpdate={setVisibleFormUpdate}
          setTransactionsUpdate={setTransactionsUpdate}
        />
      )}
    </div>
  )
}