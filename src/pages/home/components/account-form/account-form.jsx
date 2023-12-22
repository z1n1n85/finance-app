import React, {useState} from 'react'
import Button from '../../../../components/UI/Button/Button'
import Input from '../../../../components/UI/Input/Input'


export default function AccountForm({addAccount, setVisible}) {
  const [account, setAccount] = useState({
    id: 0,
    name: '',
    amount: 0,
    amount_start: 0,
  });
  const createAccount = (e) => {
    e.preventDefault();
    addAccount({...account, id: Date.now()});
    setAccount({
      id: 0,
      name: '',
      amount: 0,
      amount_start: 0,
    });
  }

  return (
    <div>
      <form
        className='Form'
        onSubmit={(e) => { createAccount(e); setVisible(false);}}
      >
        <Input
          value={account.name}
          onChange={e => setAccount({...account, name: e.target.value})}
          type='text'
          placeholder='Название счёт'
        />
        <Input
          value={account.amount}
          onChange={e => {
            return setAccount({
              ...account,
              amount: Number(e.target.value),
              amount_start: Number(e.target.value),
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
    </div>
  )
}
