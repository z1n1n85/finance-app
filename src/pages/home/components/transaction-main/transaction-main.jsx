import React, {useEffect, useState } from 'react';
import TransactionList from '../transaction-list/transaction-list';
import TransactionFormCreate from '../transaction-form-create/transaction-form-create';
import TransactionFormUpdate from '../transaction-form-update/transaction-form-update';
import Modal from '../../../../components/UI/Modal/Modal'
import Button from '../../../../components/UI/Button/Button'
import TransactionFilter from '../transaction-filter/transaction-filter';

export default function TransactionMain() {
  const [visibleFormCreate, setVisibleFormCreate] = useState(false);
  const [visibleFormUpdate, setVisibleFormUpdate] = useState(false);
  const [transactionsUpdate, setTransactionsUpdate] = useState(
    {
      _id: 0,
      type: '',
      time: 0,
      tags: [],
      cost: '',
      accountId: '',
      account_name: '',
      description: '',
    });
  return (
    <div>
      <Button onClick={() => setVisibleFormCreate(true)}>
        Добавить операцию
      </Button>
      <TransactionFilter/>
      <TransactionList
        setTransactionsUpdate={setTransactionsUpdate}
        setVisibleFormUpdate={setVisibleFormUpdate}
      />
      <Modal visible={visibleFormCreate} setVisible={setVisibleFormCreate}>
        <TransactionFormCreate 
          setVisible={setVisibleFormCreate}
        />
      </Modal>
      <Modal visible={visibleFormUpdate} setVisible={setVisibleFormUpdate}>
        <TransactionFormUpdate
          transactionsUpdate={transactionsUpdate}
          setVisible={setVisibleFormUpdate}
        />
      </Modal>
    </div>
  )
}
