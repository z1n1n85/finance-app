import React, { useContext, useEffect, useState } from 'react'
import Input from '../../../../components/UI/Input/Input'
import Textarea from '../../../../components/UI/Textarea/Textarea'
import Button from '../../../../components/UI/Button/Button'
import Select from '../../../../components/UI/Select/Select'
import { UserDataContext } from '../../../../context/user-data/user-data'
import { formatDateForInput } from '../../../../utils/date'


export default function TransactionFormCreate() {
  const { accounts, fetchTransactionsCreate, tags } = useContext(UserDataContext);

  const [transaction, setTransaction] = useState(
    {
      type: '',
      time: Date.now(),
      tags: [],
      cost: '',
      accountId: '',
      description: '',
    }
  );
  const createTransaction = (e) => {
    e.preventDefault();
    fetchTransactionsCreate(transaction);
    setTransaction({
      type: '',
      time: Date.now(),
      tags: [],
      cost: '',
      accountId: '',
      description: '',
    });
    setInputTag('');
  }

  const [inputTag, setInputTag] = useState('');
  const addTag = (e) => {
    e.preventDefault();
    setTransaction(prev => {
      return { ...prev, tags: [...prev.tags, inputTag] }
    })
  }
  const removeTag = (e, tag) => {
    e.preventDefault();
    setTransaction(prev => {
      return { ...prev, tags: prev.tags.filter((eTag) => eTag !== tag) }
    })
  }
  const initRankedTags = () => {
    let rankedTags = [];
    if (tags) {
      tags.sort((a, b) => a[1] - b[1]);
      rankedTags = tags.map((e) => e[0])
    }
    return rankedTags;
  }
  const [rankedTags, setRankedTags] = useState(initRankedTags);

  useEffect(() => {
    setRankedTags(initRankedTags());
  }, [tags]);

  return (
    <form
      className='Form'
      onSubmit={e => { createTransaction(e)}}
    >
      <Select
        value={transaction.type}
        onChange={e => setTransaction({ ...transaction, type: e.target.value })}
        basicValue='Выберете тип операции'
        options={[
          { value: 'expenses', name: 'Расходы' },
          { value: 'income', name: 'Доходы' },
        ]}
      />
      <Input
        value={formatDateForInput(transaction.time)}
        onChange={e => setTransaction({ ...transaction, time: e.target.valueAsNumber })}
        type='date'
        style={{ width: '50%' }}
      />
      <Input
        value={transaction.cost}
        onChange={e => setTransaction({ ...transaction, cost: Number(e.target.value) })}
        min='0'
        type='number'
        placeholder='Сумма'
        style={{ width: '50%' }}
      />
      <Input
        value={inputTag}
        onChange={(e) => setInputTag(e.target.value)}
        list='tags_datalist'
        type='text'
        placeholder='Тэги'
        style={{ width: '50%' }}
      />
      <datalist id='tags_datalist'>
        {rankedTags.map((rankedTag) =>
          <option value={rankedTag} />
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
      {(accounts)
        ?
        <Select
          value={transaction.accountId.toString()}
          onChange={(e) => {
            setTransaction({
              ...transaction,
              accountId: e.target.value,
            })
          }}
          basicValue='Выберете счёт операции'
          options={accounts.map((account) => {
            return { value: account._id, name: account.name }
          })}
        />
        :
        <Select
          disabled
          value=''
          basicValue='Нет доступных счетов'
        />
      }
      <Textarea
        value={transaction.description}
        onChange={e => setTransaction({ ...transaction, description: e.target.value })}
        placeholder='Описание'
      />
      {(transaction.cost && transaction.type && transaction.time && transaction.accountId)
        ? <Button type='submit'> Добавить </Button>
        : <Button type='submit' disabled>Добавить</Button>
      }
    </form>
  )
}