import React, {useState} from 'react'
import Modal from './UI/Modal/Modal'
import Button from './UI/Button/Button'
import AccountForm from './AccountForm'
import AccountList from './AccountList';

export default function AccountMain({accounts, setAccounts}) {
  const [visibleModalAccountForm, setVisibleModalAccountForm] = useState(false);
  const addAccount = (account) => {
    setAccounts([...accounts, account]);
  }
  const removeAccount = (id) => {
    setAccounts(accounts.filter((e) => e.id !== id));
  }

  return (
    <div>
      <Button onClick={() => setVisibleModalAccountForm(true)}>
        Добавить счёт
      </Button>
      <AccountList
        accounts={accounts}
        removeAccount={removeAccount}
      />
      <Modal visible={visibleModalAccountForm} setVisible={setVisibleModalAccountForm}>
        <AccountForm
          accounts={accounts}
          addAccount={addAccount}
          setVisible={setVisibleModalAccountForm}
        />
      </Modal>
    </div>
  )
}
