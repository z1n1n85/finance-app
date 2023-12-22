import React, {useState} from 'react'
import Modal from '../../../../components/UI/Modal/Modal'
import Button from '../../../../components/UI/Button/Button'
import AccountForm from '../account-form/account-form'
import AccountList from '../account-list/account-list';

export default function AccountMain({accounts, setAccounts, removeAccount}) {
  const [visibleModalAccountForm, setVisibleModalAccountForm] = useState(false);
  const addAccount = (account) => {
    setAccounts([...accounts, account]);
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
