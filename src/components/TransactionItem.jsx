import React from 'react';
import Button from './UI/Button/Button';

export default function PostTransaction({transaction, removeTransaction}) {
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return Intl.DateTimeFormat('ru', options).format(date);
  }
  
  return(
    <div className='Item'>
      <h2>{transaction.cost}</h2>
      <h3>{transaction.category}</h3>
      <p>Счёт: {transaction.account_name}</p>
      <p>{transaction.description}</p>
      <p>{formatDate(transaction.time)}</p>
      <Button onClick={() => removeTransaction(transaction.id)}>
        Удалить
      </Button>
    </div>
  )
}