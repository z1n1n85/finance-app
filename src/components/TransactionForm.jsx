import React, {useState} from 'react'
import Input from './UI/Input/Input'
import Textarea from './UI/Textarea/Textarea'
import Button from './UI/Button/Button';
import Select from './UI/Select/Select';


export default function TransactionForm({addTransaction, setVisible}) {
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
      description: '',
    }
  );
  const createTransaction = (e) => {
    if (transaction.type === 'expenses') {
      setTransaction({...transaction, cost: transaction.cost * (-1)})
    }
    e.preventDefault();
    addTransaction({...transaction, id: Date.now()});
    setTransaction({
      id: 0, 
      type: '', 
      time: Date.now(), 
      category: '', 
      cost: '', 
      description: '',
    });
  }
  return (
    <div >
      <h1>
        Добавьте новую операцию
      </h1>
      <form
        className='TransactionForm'
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
          onChange={e => setTransaction({...transaction, cost: e.target.value})}
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