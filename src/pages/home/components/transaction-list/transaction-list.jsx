import React, { useContext } from 'react'
import TransactionItem from 'pages/home/components/transaction-item/transaction-item'
import { UserDataContext } from 'context/user-data/user-data'
import { Separator } from "components/UI/separator"

export default function TransactionList() {
  const {sortedTransactions} = useContext(UserDataContext);

  if (!sortedTransactions || sortedTransactions.length === 0) {
    return (
      <div className='flex items-center justify-center h-full w-full'>
        <p className='text-xl text-gray-500 text-center mt-8 mb-8'>Операций нет</p>
      </div>
    )
  }
  return (
    <div className='flex flex-col justify-start items-stretch h-full w-full'>
      {sortedTransactions.map((transaction) => 
        <>
          <Separator className="my-4" />
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
          />
        </>
      )}
    </div>
  )
}