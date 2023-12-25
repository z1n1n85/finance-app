import React, {useState} from 'react'
import Button from '../../../../components/UI/Button/Button'
import Input from '../../../../components/UI/Input/Input'


export default function AccountForm({fetchAccountsCreate, setVisible}) {
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
    </div>
  )
}
