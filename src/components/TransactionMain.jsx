import React, {useEffect, useState } from 'react';
import TransactionList from './TransactionList';
import TransactionFormCreate from './TransactionFormCreate';
import Modal from './UI/Modal/Modal'
import Button from './UI/Button/Button'
import TransactionFilter from './TransactionFilter';

export default function TransactionMain({
  transactions,
  accounts,
  sortTransactions,
  sortedTransactions,
  removeTransaction,
  addTransaction,
  updateTransaction,
}) {
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
  const [visibleModalTransactionForm, setVisibleModalTransactionForm] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisibleModalTransactionForm(true)}>
        Добавить операцию
      </Button>
      <TransactionFilter sortTransactions={sortTransactions}/>
      <TransactionList 
        transactions={sortedTransactions}
        removeTransaction={removeTransaction}
      />
      <Modal visible={visibleModalTransactionForm} setVisible={setVisibleModalTransactionForm}>
        <TransactionFormCreate 
          accounts={accounts}
          addTransaction={addTransaction}
          tags={tags} 
          setVisible={setVisibleModalTransactionForm}
        />
      </Modal>
    </div>
  )
}
