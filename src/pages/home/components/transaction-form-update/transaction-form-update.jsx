import React, {useEffect, useState} from 'react'
import Input from '../../../../components/UI/Input/Input'
import Textarea from '../../../../components/UI/Textarea/Textarea'
import Button from '../../../../components/UI/Button/Button'
import Select from '../../../../components/UI/Select/Select'


export default function TransactionFormUpdate({
  transactionsUpdate,
  accounts, 
  updateTransaction,
  tags,
  setVisible
}) {
  const [transaction, setTransaction] = useState(transactionsUpdate);
  const [inputTag, setInputTag] = useState('');
  const addTag = (e) => {
    e.preventDefault();
    // TODO всплывающее сообщение о дублировании тегов
    setTransaction(prev => {
      return {...prev, tags: [...prev.tags, inputTag] }
    })
  }
  const removeTag = (e, tag) => {
    e.preventDefault();
    setTransaction(prev => {
      return {...prev, tags: prev.tags.filter((eTag) => eTag !== tag)}
    })
  }
  const initRankedTags = () => {
    let rankedTags = [];
    tags.sort((a, b) => a[1] - b[1]);
    rankedTags = tags.map((e) => e[0])
    return rankedTags;
  }
  const [rankedTags, setRankedTags] = useState(initRankedTags);
  useEffect(() => {
    setTransaction({...transactionsUpdate, cost: Math.abs(transactionsUpdate.cost)})
  }, [transactionsUpdate]);
  useEffect(() => {
    setRankedTags(initRankedTags());
  }, [tags]);
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
  const addUpdateTransaction = (e) => {
    e.preventDefault();
    updateTransaction(transaction);
    setInputTag('');
  }
  return (
    <div >
      <h1>
        Редактировать операцию
      </h1>
      <form
        className='Form'
        onSubmit={(e) => {addUpdateTransaction(e); setVisible(false);}}
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
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          list='tags_datalist'
          type='text'
          placeholder='Тэги'
          style={{width: '50%'}}
        />
        <datalist id='tags_datalist'>
          {rankedTags.map((rankedTag) => 
            <option value={rankedTag}/>
          )}
        </datalist>
        {(inputTag !== '' && !transaction.tags.includes(inputTag))
          ? <Button onClick={(e) => addTag(e)}> Добавить тег </Button>
          : <Button disabled > Добавить тег </Button>
        }
        {transaction.tags.map((tag) => 
          <span>
            <h4 className='Tag'>{tag}</h4>
            <Button onClick={(e) => removeTag(e, tag)}>Удалить тег</Button>
          </span>
        )}
        <Select
          value={transaction.account_id.toString()}
          onChange={(e) => {
            setTransaction({
              ...transaction, 
              account_id: Number(e.target.value), 
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
        {(transaction.cost && transaction.type && transaction.time && transaction.account_id)
          ? <Button type='submit'> Сохранить </Button>
          : <Button type='submit' disabled> Сохранить</Button>
        }
      </form>
    </div>
  )
}