import React, { useEffect, useState } from 'react';
import './styles/App.css'
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import Modal from './components/UI/Modal/Modal'
import Button from './components/UI/Button/Button'
import TransactionFilter from './components/TransactionFilter';

export default function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1697716121476,
      time: 1697716121476,
      type: 'expenses',
      category: 'Кафе',
      cost: -500,
      description: 'Двойной раф в обеденный перерыв',
    },
    {
      id: 1697816121476,
      time: 1697816121476,
      type: 'income',
      category: 'Зарплата',
      cost: 3000,
      description: 'Заказ с Habr.Freelance',
    },
    {
      id: 1697716541476,
      time: 1697716541476,
      type: 'expenses',
      category: 'Продукты',
      cost: -953,
      description: 'Молок, котлеты, овощи, коробка конфет',
    },
    {
      id: 1695516121476,
      time: 1695516121476,
      type: 'expenses',
      category: 'Кафе',
      cost: -120,
      description: 'Пирожок в столовой',
    },
  ]);
  const [sortedTransactions, setSortedTransactions] = useState('');
  useEffect(() => {
    setSortedTransactions(transactions);
  }, [transactions]);
  const sortTransactions = (parametr, direction) => {
    (direction === 'increase')
    ? setSortedTransactions([...sortedTransactions].sort(
        (a, b) => a[parametr] - b[parametr]
      ))
    : setSortedTransactions([...sortedTransactions].sort(
        (a, b) => b[parametr] - a[parametr]
      ))
  }
  const [visibleModal, setVisibleModal] = useState(false);
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  }
  const removeTransaction = (id) => {
    setTransactions(transactions.filter((e) => e.id !== id));
  }
  return (
    <div className="App">
      <Button onClick={() => setVisibleModal(true)}>
        Добавить операцию
      </Button>
      <TransactionFilter sortTransactions={sortTransactions}/>
      <Modal visible={visibleModal} setVisible={setVisibleModal}>
        <TransactionForm addTransaction={addTransaction} setVisible={setVisibleModal}/>
      </Modal>
      <TransactionList 
        transactions={sortedTransactions}
        removeTransaction={removeTransaction}
      />
    </div>
  );
}