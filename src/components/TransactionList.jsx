import React from 'react'
import TransactionItem from './TransactionItem'

export default function TransactionList({transactions, removeTransaction}) {
  if (!transactions.length) {
    return (
      <div className='TransactionList'>
        <h1 className='TransactionListHeader'>Операций нет</h1>
      </div>
    )
  }
  return (
    <div className='TransactionList'>
      {transactions.map((transaction, index) => 
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          number={index+1}
          removeTransaction={removeTransaction}
        />
      )}
    </div>
  )
}