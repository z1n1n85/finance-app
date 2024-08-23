import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from 'context/user-data/user-data'
import { Input } from 'components/UI/input'
import { InputDate } from 'components/UI/input-date'
import { Button } from 'components/UI/button'
import { Textarea } from "components/UI/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/UI/select'
import { Modal } from 'components/UI/modal'
import { Badge } from 'components/UI/badge'
import { Separator } from 'components/UI/separator'
import { Label } from 'components/UI/label'

export function ModalTransactionUpdate({ triggerElement, transactionUpdate }) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <Modal
      className='top-[30%] sm:top-[50%]'
      open={open}
      onOpenChange={setOpen}
      triggerElement={triggerElement}
      title='Добавьте новую операцию:'
      content={
        <form
          className='grid gap-4 max-h-[350px] sm:max-h-[450px] overflow-y-auto px-2 py-1'
          onSubmit={e => {
            addUpdateTransaction(e);
            setOpen(false);
          }}
        >
          <Label htmlFor='transaction-type' className='mt-2'>Выберете тип операции</Label>
          <Select
            id='transaction-type'
            defaultValue={transaction.type}
            onValueChange={newValue => setTransaction({ ...transaction, type: newValue })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder='Не выбрано...' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='expenses'>Расходы</SelectItem>
                <SelectItem value='income'>Доходы</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label htmlFor='transaction-time' className='mt-2'>Выберете дату</Label>
          <InputDate
            id='transaction-time'
            placeholder='Выберете дату...'
            valueDate={transaction.time}
            setValueDate={newValue => { setTransaction({ ...transaction, time: newValue }) }}
          />
          <Label htmlFor='transaction-cost' className='mt-2'>Сумма операции</Label>
          <Input
            id='transaction-cost'
            value={transaction.cost}
            onChange={e => setTransaction({ ...transaction, cost: Number(e.target.value) })}
            min='0'
            type='number'
            placeholder='Введите сумму...'
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
          <Label htmlFor='transaction-tag' className='mt-2'>Тэги операции</Label>
          <Input
            id='transaction-tag'
            value={inputTag}
            onChange={e => setInputTag(e.target.value)}
            placeholder='Введите новый тэг...'
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
          <Label htmlFor='transaction-account' className='mt-2'>Счёт операции</Label>
          <Select
            id='transaction-account'
            disabled={(accounts?.length === 0) ? true : false}
            defaultValue={transaction.accountId.toString()}
            onValueChange={newValue => {
              setTransaction({
                ...transaction,
                accountId: newValue,
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={(accounts?.length === 0) ? 'Нет доступных счетов' : 'Не выбранно...'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {accounts?.map(account => 
                  <SelectItem value={account._id}>{account.name}</SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label htmlFor='transaction-description' className='mt-2'>Описание операции</Label>
          <Textarea
            id='transaction-description'
            className="resize-none"
            value={transaction.description}
            onChange={e => setTransaction({ ...transaction, description: e.target.value })}
            placeholder='Введите описание...'
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
