import React, {useState } from 'react';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import Modal from './UI/Modal/Modal'
import Button from './UI/Button/Button'
import TransactionFilter from './TransactionFilter';

export default function TransactionMain(
    {accounts, sortTransactions, sortedTransactions, removeTransaction, addTransaction}
  ) {
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
        <TransactionForm 
          accounts={accounts}
          addTransaction={addTransaction} 
          setVisible={setVisibleModalTransactionForm}
        />
      </Modal>
    </div>
  )
}
