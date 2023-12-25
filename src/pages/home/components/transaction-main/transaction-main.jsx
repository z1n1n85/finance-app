import React, {useEffect, useState } from 'react';
import TransactionList from '../transaction-list/transaction-list';
import TransactionFormCreate from '../transaction-form-create/transaction-form-create';
import TransactionFormUpdate from '../transaction-form-update/transaction-form-update';
import Modal from '../../../../components/UI/Modal/Modal'
import Button from '../../../../components/UI/Button/Button'
import TransactionFilter from '../transaction-filter/transaction-filter';

export default function TransactionMain({
  transactions,
  setTransactions,
  accounts,
  sortedTransactions,
  filterParametrs,
  setFilterParametrs,
  fetchTransactionsCreate,
  fetchTransactionsUpdate,
  fetchTransactionsDelete,
  tags,
}) {
  // const addTransaction = (transaction) => {
  //   setTransactions(prev => [...prev, transaction]);
  // }
  // const removeTransaction = (_id) => {
  //   setTransactions(prev => prev.filter((e) => e._id !== _id));
  // }
  // const updateTransaction = (transaction) => {
  //   removeTransaction(transaction._id);
  //   addTransaction(transaction);
  // }
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
      <TransactionFilter 
        filterParametrs={filterParametrs}
        setFilterParametrs={setFilterParametrs}
      />
      <TransactionList 
        accounts={accounts}
        transactions={sortedTransactions}
        fetchTransactionsDelete={fetchTransactionsDelete}
        setVisibleFormUpdate={setVisibleFormUpdate}
        setTransactionsUpdate={setTransactionsUpdate}
      />
      <Modal visible={visibleFormCreate} setVisible={setVisibleFormCreate}>
        <TransactionFormCreate 
          accounts={accounts}
          fetchTransactionsCreate={fetchTransactionsCreate}
          tags={tags} 
          setVisible={setVisibleFormCreate}
        />
      </Modal>
      <Modal visible={visibleFormUpdate} setVisible={setVisibleFormUpdate}>
        <TransactionFormUpdate
          transactionsUpdate={transactionsUpdate}
          accounts={accounts}
          fetchTransactionsUpdate={fetchTransactionsUpdate}
          tags={tags} 
          setVisible={setVisibleFormUpdate}
        />
      </Modal>
    </div>
  )
}
