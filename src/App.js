import React, { useEffect, useState } from 'react';
import './styles/App.css'
import TransactionMain from './components/TransactionMain';
import AccountMain from './components/AccountMain';

export default function App() {
  // TRANSATIONS
  const [transactions, setTransactions] = useState([
    {
      id: 1697716121476,
      time: 1697716121476,
      type: 'expenses',
      category: 'Кафе',
      cost: -500,
      account_id: 1,
      account_name: 'Mastercard',
      description: 'Двойной раф в обеденный перерыв',
    },
    {
      id: 1697816121476,
      time: 1697816121476,
      type: 'income',
      category: 'Зарплата',
      cost: 3000,
      account_id: 1,
      account_name: 'Mastercard',
      description: 'Заказ с Habr.Freelance',
    },
    {
      id: 1697716541476,
      time: 1697716541476,
      type: 'expenses',
      category: 'Продукты',
      cost: -953,
      account_id: 2,
      account_name: 'Visa',
      description: 'Молок, котлеты, овощи, коробка конфет',
    },
    {
      id: 1695516121476,
      time: 1695516121476,
      type: 'expenses',
      category: 'Кафе',
      cost: -120,
      account_id: 2,
      account_name: 'Visa',
      description: 'Пирожок в столовой',
    },
  ]);
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
  const [sortedTransactions, setSortedTransactions] = useState('');
  const sortTransactions = (parametr, direction) => {
    setSortedTransactions([...sortedTransactions].sort(
      (direction === 'increase')
      ? (a, b) => a[parametr] - b[parametr]
      : (a, b) => b[parametr] - a[parametr]
    ))
  }
  // ACCOUNTS
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: 'Mastercard',
      amount_start: 1000,
      amount: 3500,
    },
    {
      id: 2,
      name: 'Visa',
      amount_start: 1500,
      amount: 427,
    }
  ]);
  const addAccount = (account) => {
    setAccounts([...accounts, account]);
  }
  const removeAccount = (id) => {
    setAccounts(accounts.filter((e) => e.id !== id));
  }
  const updateAccountsAmount = () => {
    let accounts_copy = [...accounts];
    accounts.forEach((account, index) => {
      let amount = account.amount_start;
      transactions.filter(
        (transaction) => transaction.account_id === account.id
      ).forEach((transaction) => {
        amount += transaction.cost;
      });
      accounts_copy[index].amount = amount;
    });
    setAccounts([...accounts_copy]);
  }
  // TRANSACTIONS + ACCOUNTS
  useEffect(() => {
    setSortedTransactions(transactions);
    updateAccountsAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);
  return (
    <div className="App">
      <TransactionMain
        accounts={accounts}
        sortTransactions={sortTransactions}
        sortedTransactions={sortedTransactions}
        removeTransaction={removeTransaction}
        addTransaction={addTransaction}
        updateTransaction={updateTransaction}
      />
      <AccountMain
        accounts={accounts}
        addAccount={addAccount}
        removeAccount={removeAccount}
      />
    </div>
  );
}