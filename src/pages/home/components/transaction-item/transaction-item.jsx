import React, { useContext } from 'react';
import Button from '../../../../components/UI/Button/Button';
import { UserDataContext } from '../../../../context/user-data/user-data';
import { formatDateMonth } from '../../../../utils/date';

export default function TransactionItem({
  transaction,
  setVisibleFormUpdate,
  setTransactionsUpdate,
}) {
  const {accounts, fetchTransactionsDelete} = useContext(UserDataContext);
  
  const getAccountName = () =>{
    if (accounts){
      const account = accounts.filter((account) => 
        account._id === transaction.accountId
      )[0];
      return (account) ? account.name : 'Отсутствует';
    } else {
      return 'Отсутствует';
    }
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
      <p>{formatDateMonth(transaction.time)}</p>
      <Button onClick={() => fetchTransactionsDelete(transaction._id)}>
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