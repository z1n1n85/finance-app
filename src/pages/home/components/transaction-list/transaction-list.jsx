import React from 'react'
import TransactionItem from '../transaction-item/transaction-item'

export default function TransactionList({
  accounts,
  transactions,
  removeTransaction,
  setVisibleFormUpdate,
  setTransactionsUpdate,
}) {
  if (!transactions.length) {
    return (
      <div className='List'>
        <h1 className='Header'>Операций нет</h1>
      </div>
    )
  }
  return (
    <div className='List'>
      {transactions.map((transaction, index) => 
        <TransactionItem
          accounts={accounts}
          key={transaction.id}
          transaction={transaction}
          number={index+1}
          removeTransaction={removeTransaction}
          setVisibleFormUpdate={setVisibleFormUpdate}
          setTransactionsUpdate={setTransactionsUpdate}
        />
      )}
    </div>
  )
}