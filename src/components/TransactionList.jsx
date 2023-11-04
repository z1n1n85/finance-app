import React from 'react'
import TransactionItem from './TransactionItem'

export default function TransactionList({transactions, removeTransaction}) {
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
          key={transaction.id}
          transaction={transaction}
          number={index+1}
          removeTransaction={removeTransaction}
        />
      )}
    </div>
  )
}