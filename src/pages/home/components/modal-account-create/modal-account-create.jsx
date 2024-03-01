import React, { useContext, useState } from 'react'
import { Input } from 'components/UI/input'
import { Button } from 'components/UI/button'
import { Label } from 'components/UI/label'
import { UserDataContext } from 'context/user-data/user-data'
import Modal from 'components/UI/modal'

export default function ModalAccountCreate({ triggerElement }) {
  const { fetchAccountsCreate } = useContext(UserDataContext);

  const [open, setOpen] = useState(false);

  const [account, setAccount] = useState({
    name: '',
    amount: '',
    amountStart: '',
  });
  const createAccount = (e) => {
    e.preventDefault();
    fetchAccountsCreate(account);
    setAccount({
      name: '',
      amount: '',
      amountStart: '',
    });
  }

  return (
    <Modal
      className='top-[30%] sm:top-[50%]'
      open={open}
      onOpenChange={setOpen}
      triggerElement={triggerElement}
      title='Добавьте новый счёт:'
      content={
        <form
          className='grid gap-4 max-h-[350px] sm:max-h-[450px] overflow-y-auto px-2 py-1'
          onSubmit={e => {
            createAccount(e);
            setOpen(false);
          }}
        >
          <Label htmlFor='account-name' className='mt-2'>Название счёта</Label>
          <Input
            id='account-name'
            value={account.name}
            onChange={e => setAccount({ ...account, name: e.target.value })}
            type='text'
            placeholder='Введите название...'
          />
          <Label htmlFor='account-ammount' className='mt-2'>Остаток на счёте</Label>
          <Input
            id='account-ammount'
            value={account.amount}
            onChange={e => {
              return setAccount({
                ...account,
                amount: Number(e.target.value),
                amountStart: Number(e.target.value),
              })
            }}
            min='0'
            type='number'
            placeholder='Введите сумму...'
          />
          {(account.name)
            ? <Button type='submit'>Добавить</Button>
            : <Button type='submit' disabled>Добавить</Button>
          }
        </form>
      }
    />
  )
}
