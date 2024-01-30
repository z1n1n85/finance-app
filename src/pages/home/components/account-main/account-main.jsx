import React, {useState} from 'react'
import Modal from '../../../../components/UI/Modal/Modal'
import Button from '../../../../components/UI/Button/Button'
import AccountForm from '../account-form/account-form'
import AccountList from '../account-list/account-list';

export default function AccountMain() {
  const [visibleModalAccountForm, setVisibleModalAccountForm] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisibleModalAccountForm(true)}>
        Добавить счёт
      </Button>
      <AccountList/>
      <Modal visible={visibleModalAccountForm} setVisible={setVisibleModalAccountForm}>
        <AccountForm
          setVisible={setVisibleModalAccountForm}
        />
      </Modal>
    </div>
  )
}
