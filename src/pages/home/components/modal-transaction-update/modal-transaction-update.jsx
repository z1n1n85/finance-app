import React, { useContext, useEffect, useState } from 'react'
import { Input } from 'components/UI/input'
import InputDate from 'components/UI/input-date'
import { Button } from 'components/UI/button'
import { Textarea } from "components/UI/textarea"
import { Select } from 'components/UI/select'
import { UserDataContext } from 'context/user-data/user-data'
import Modal from 'components/UI/modal'
import { Badge } from 'components/UI/badge'
import { Separator } from 'components/UI/separator'

export default function ModalTransactionUpdate({ triggerElement, transactionUpdate }) {
  const { accounts, fetchTransactionsUpdate, tags } = useContext(UserDataContext);

  const [open, setOpen] = useState(false);

  const [transaction, setTransaction] = useState(transactionUpdate);
  const addUpdateTransaction = (e) => {
    e.preventDefault();
    fetchTransactionsUpdate(transaction);
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
    <Modal
      open={open}
      onOpenChange={setOpen}
      triggerElement={triggerElement}
      title='Добавьте новую операцию:'
      content={
        <form
          className='grid gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto px-2 py-1'
          onSubmit={e => {
            addUpdateTransaction(e);
            setOpen(false);
          }}
        >
          <Select
            startValue={transaction.type}
            onChange={newValue => setTransaction({ ...transaction, type: newValue })}
            placeholder='Выберете тип операции'
            options={[
              { value: 'expenses', label: 'Расходы' },
              { value: 'income', label: 'Доходы' },
            ]}
          />
          <InputDate
            placeholder='Выберете дату...'
            valueDate={transaction.time}
            setValueDate={newValue => { setTransaction({ ...transaction, time: newValue }) }}
          />
          <Input
            value={transaction.cost}
            onChange={e => setTransaction({ ...transaction, cost: Number(e.target.value) })}
            min='0'
            type='number'
            placeholder='Сумма'
          />
          {/* <Select
            startValue={inputTag}
            onChange={newValue => setInputTag(newValue)}
            placeholder='Добавьте тэги...'
            options={rankedTags.map((rankedTag) => {
              return { value: rankedTag, label: rankedTag }
            })}
            isSearch={true}
            searchPlaceholder='Найти тэг'
            searchEmpty='Ни один тэг не найден'
          /> */}
          <Input
            value={inputTag}
            onChange={e => setInputTag(e.target.value)}
            placeholder='Добавьте новый тэг...'
          />
          {(inputTag !== '' && !transaction.tags.includes(inputTag))
            ? <Button onClick={(e) => addTag(e)}> Добавить тег </Button>
            : <Button disabled > Добавить тег </Button>
          }
          {(transaction.tags.length)
            ?
            <div className='grid'>
              {transaction.tags.map((tag) =>
                <div>
                  <Separator className='mb-2' />
                  <div className='flex justify-between mb-2'>
                    <Badge variant="secondary">{tag}</Badge>
                    <Button
                      onClick={e => removeTag(e, tag)}
                      variant="destructive"
                      className='px-2 py-1 text-xs h-8'
                    >
                      Удалить тег
                    </Button>
                  </div>
                </div>
              )}
            </div>
            : ''
          }
          {(accounts)
            ?
            <Select
              startValue={transaction.accountId.toString()}
              onChange={newValue => {
                setTransaction({
                  ...transaction,
                  accountId: newValue,
                })
              }}
              placeholder='Выберете счёт операции'
              options={accounts.map((account) => {
                return { value: account._id, label: account.name }
              })}
            />
            :
            <Select
              disabled
              startValue=''
              placeholder='Нет доступных счетов'
            />
          }
          <Textarea
            className="resize-none"
            value={transaction.description}
            onChange={e => setTransaction({ ...transaction, description: e.target.value })}
            placeholder='Описание'
          />
          {(transaction.cost && transaction.type && transaction.time && transaction.accountId)
            ? <Button type='submit'> Сохранить изменения </Button>
            : <Button type='submit' disabled>Сохранить изменения</Button>
          }
        </form>
      }
    />
  )
}
