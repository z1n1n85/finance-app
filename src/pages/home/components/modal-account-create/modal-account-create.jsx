import React, { useContext, useState } from 'react'
import { Input } from 'components/UI/input'
import { Button } from 'components/UI/button'
import { UserDataContext } from 'context/user-data/user-data'
import Modal from 'components/UI/modal'

export default function ModalAccountCreate({ triggerElement }) {
  const { fetchAccountsCreate } = useContext(UserDataContext);

  const [open, setOpen] = useState(false);

  const [account, setAccount] = useState({
    name: '',
    amount: 0,
    amountStart: 0,
  });
  const createAccount = (e) => {
    e.preventDefault();
    fetchAccountsCreate(account);
    setAccount({
      name: '',
      amount: 0,
      amountStart: 0,
    });
  }

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      triggerElement={triggerElement}
      title='Добавьте новый счёт:'
      content={
        <form
          className='grid gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto px-2 py-1'
          onSubmit={e => {
            createAccount(e);
            setOpen(false);
          }}
        >
          <Input
            value={account.name}
            onChange={e => setAccount({ ...account, name: e.target.value })}
            type='text'
            placeholder='Название счёт'
          />
          <Input
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
            placeholder='Остаток'
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
