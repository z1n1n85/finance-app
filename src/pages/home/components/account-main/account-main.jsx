import React, {useState} from 'react'
import Modal from '../../../../components/UI/Modal/Modal'
import Button from '../../../../components/UI/Button/Button'
import AccountForm from '../account-form/account-form'
import AccountList from '../account-list/account-list';

export default function AccountMain({
    accounts,
    setAccounts,
    removeAccount,
    fetchAccountsCreate,
    fetchAccountsDelete,
  }) {
  const [visibleModalAccountForm, setVisibleModalAccountForm] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisibleModalAccountForm(true)}>
        Добавить счёт
      </Button>
      <AccountList
        accounts={accounts}
        fetchAccountsDelete={fetchAccountsDelete}
      />
      <Modal visible={visibleModalAccountForm} setVisible={setVisibleModalAccountForm}>
        <AccountForm
          accounts={accounts}
          fetchAccountsCreate={fetchAccountsCreate}
          setVisible={setVisibleModalAccountForm}
        />
      </Modal>
    </div>
  )
}
