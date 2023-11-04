import React, {useState} from 'react'
import Input from './UI/Input/Input'
import Textarea from './UI/Textarea/Textarea'
import Button from './UI/Button/Button'
import Select from './UI/Select/Select'


export default function TransactionForm({accounts, addTransaction, setVisible}) {
  const formatDate = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
    return [year, month, day].join('-');
  }
  const [transaction, setTransaction] = useState(
    {
      id: 0,
      type: '',
      time: Date.now(),
      category: '',
      cost: '',
      account_id: '',
      account_name: '',
      description: '',
    }
  );
  const createTransaction = (e) => {
    e.preventDefault();
    (transaction.type === 'expenses')
      ? addTransaction({...transaction, cost: transaction.cost * (-1), id: Date.now()})
      : addTransaction({...transaction, id: Date.now()})
    setTransaction({
      id: 0,
      type: '',
      time: Date.now(),
      category: '',
      cost: '',
      account_id: '',
      account_name: '',
      description: '',
    });
  }
  return (
    <div >
      <h1>
        Добавьте новую операцию
      </h1>
      <form
        className='Form'
        onSubmit={(e) => {createTransaction(e); setVisible(false);}}
      >
        <Select
          value={transaction.type}
          onChange={e => setTransaction({...transaction, type: e.target.value})}
          basicValue='Выберете тип операции'
          options={[
            {value: 'expenses', name: 'Расходы'}, 
            {value: 'income', name: 'Доходы'},
          ]}
        />
        <Input
          value={formatDate(transaction.time)}
          onChange={e => setTransaction({...transaction, time: e.target.valueAsNumber})}
          type='date'
          style={{width: '50%'}}
        />
        <Input
          value={transaction.cost}
          onChange={e => setTransaction({...transaction, cost: Number(e.target.value)})}
          min='0'
          type='number'
          placeholder='Сумма' 
          style={{width: '50%'}}
        />
        <Input
          value={transaction.category}
          onChange={e => setTransaction({...transaction, category: e.target.value})}
          type='text'
          placeholder='Категория' 
          style={{width: '50%'}}
        />
        <Select
          value={transaction.account_id.toString()}
          onChange={(e) => {
            setTransaction({
              ...transaction, 
              account_id: Number(e.target.value), 
              account_name: accounts.filter((account) => {
                return account.id === Number(e.target.value)
              })[0].name,
            })
          }}
          basicValue='Выберете счёт операции'
          options={accounts.map((account) => {
            return {value: account.id, name: account.name}
          })}
        />
        <Textarea
          value={transaction.description}
          onChange={e => setTransaction({...transaction, description: e.target.value})}
          placeholder='Описание'
        />
        {(transaction.cost && transaction.category && transaction.type)
          ? <Button type='submit'> Добавить </Button>
          : <Button type='submit' disabled>Добавить</Button>
        }
      </form>
    </div>
  )
}