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
}) {
  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  }
  const removeTransaction = (id) => {
    setTransactions(prev => prev.filter((e) => e.id !== id));
  }
  const updateTransaction = (transaction) => {
    removeTransaction(transaction.id);
    addTransaction(transaction);
  }
  const initTags = () => {
    let tags = [];
    transactions.forEach((transaction) => {
      transaction.tags.forEach((tag) => {
        (tags.filter((e) => e[0] === tag).length)
        ? tags.filter((e) => e[0] === tag)[0][1] += 1
        : tags.push([tag, 1])
      })
    });
    return tags;
  } 
  const [tags, setTags] = useState(initTags);
  useEffect(() => {
    setTags(initTags());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);
  const [visibleFormCreate, setVisibleFormCreate] = useState(false);
  const [visibleFormUpdate, setVisibleFormUpdate] = useState(false);
  const [transactionsUpdate, setTransactionsUpdate] = useState(
    {
      id: 0,
      type: '',
      time: 0,
      tags: [],
      cost: '',
      account_id: '',
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
        removeTransaction={removeTransaction}
        setVisibleFormUpdate={setVisibleFormUpdate}
        setTransactionsUpdate={setTransactionsUpdate}
      />
      <Modal visible={visibleFormCreate} setVisible={setVisibleFormCreate}>
        <TransactionFormCreate 
          accounts={accounts}
          addTransaction={addTransaction}
          tags={tags} 
          setVisible={setVisibleFormCreate}
        />
      </Modal>
      <Modal visible={visibleFormUpdate} setVisible={setVisibleFormUpdate}>
        <TransactionFormUpdate
          transactionsUpdate={transactionsUpdate}
          accounts={accounts}
          updateTransaction={updateTransaction}
          tags={tags} 
          setVisible={setVisibleFormUpdate}
        />
      </Modal>
    </div>
  )
}
