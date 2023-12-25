import React from 'react'
import TransactionItem from '../transaction-item/transaction-item'

export default function TransactionList({
  accounts,
  transactions,
  fetchTransactionsDelete,
  setVisibleFormUpdate,
  setTransactionsUpdate,
}) {
  if (!transactions) {
    return (
      <div className='List'>
        <h1 className='Header'>Операций нет</h1>
      </div>
    )
  }
  return (
    <div className='List'>
      {transactions.map((transaction) => 
        <TransactionItem
          accounts={accounts}
          key={transaction._id}
          transaction={transaction}
          fetchTransactionsDelete={fetchTransactionsDelete}
          setVisibleFormUpdate={setVisibleFormUpdate}
          setTransactionsUpdate={setTransactionsUpdate}
        />
      )}
    </div>
  )
}