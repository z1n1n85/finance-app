import React, {useState} from 'react'
import Modal from './UI/Modal/Modal'
import Button from './UI/Button/Button'
import AccountForm from './AccountForm'
import AccountList from './AccountList';

export default function AccountMain({accounts, addAccount, removeAccount}) {
  const [visibleModalAccountForm, setVisibleModalAccountForm] = useState(false);

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
