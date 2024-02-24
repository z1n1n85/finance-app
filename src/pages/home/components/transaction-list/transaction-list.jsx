import React, { useContext } from 'react'
import TransactionItem from 'pages/home/components/transaction-item/transaction-item'
import { UserDataContext } from 'context/user-data/user-data'
import { Separator } from "components/UI/separator"

export default function TransactionList() {
  const {sortedTransactions} = useContext(UserDataContext);

  if (!sortedTransactions || sortedTransactions.length === 0) {
    return (
      <p className='text-4xl text-center mt-8 mb-8'>Операций нет</p>
    )
  }
  return (
    <>
      {sortedTransactions.map((transaction) => 
        <>
          <Separator className="my-4" />
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
          />
        </>
      )}
    </>
  )
}