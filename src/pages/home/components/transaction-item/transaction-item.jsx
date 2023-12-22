import React from 'react';
import Button from '../../../../components/UI/Button/Button';

export default function TransactionItem({
    accounts,
    transaction,
    removeTransaction,
    setVisibleFormUpdate,
    setTransactionsUpdate,
  }) {
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return Intl.DateTimeFormat('ru', options).format(date);
  }
  
  const getAccountName = () =>{
    const account = accounts.filter((account) => 
      account.id === transaction.account_id
    )[0];
    return (account) ? account.name : 'Отсутствует';
  }

  return(
    <div className='Item'>
      {(transaction.type === 'expenses')
      ? <h2>-{transaction.cost}</h2>
      : <h2>+{transaction.cost}</h2>}
      <h4>{transaction.tags.map((tag, index) =>
        <span
          className='Tag' key={index}>{tag}</span>
      )}</h4>
      <p>Счёт: {getAccountName()}</p>
      <p>{transaction.description}</p>
      <p>{formatDate(transaction.time)}</p>
      <Button onClick={() => removeTransaction(transaction.id)}>
        Удалить
      </Button>
      <Button onClick={() => {
        setTransactionsUpdate(transaction);
        setVisibleFormUpdate(true);
      }}>
        Редактировать
      </Button>
    </div>
  )
}