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
      tags: ['Кафе', 'Перекус'],
      cost: -500,
      account_id: 1,
      account_name: 'Mastercard',
      description: 'Двойной раф в обеденный перерыв',
    },
    {
      id: 1697816121476,
      time: 1697816121476,
      type: 'income',
      tags: ['Зарплата'],
      cost: 3000,
      account_id: 1,
      account_name: 'Mastercard',
      description: 'Заказ с Habr.Freelance',
    },
    {
      id: 1697716541476,
      time: 1697716541476,
      type: 'expenses',
      tags: ['Продукты', 'Перекресток'],
      cost: -953,
      account_id: 2,
      account_name: 'Visa',
      description: 'Молок, котлеты, овощи, коробка конфет',
    },
    {
      id: 1695516121476,
      time: 1695516121476,
      type: 'expenses',
      tags: ['Столовая', 'Перекус'],
      cost: -120,
      account_id: 2,
      account_name: 'Visa',
      description: 'Пирожок в столовой',
    },
  ]);
  const [filterParametrs, setFilterParametrs] = useState({
    property:{
      actual: 'time',
      options: [
        {value: 'cost', name: 'По сумме'},
        {value: 'time', name: 'По дате'},
      ],
    },
    direction:{
      actual: 'decrease',
      options: [
        {value: 'increase', name: 'Возрастание'},
        {value: 'decrease', name: 'Убывание'},
      ],
    },
  });
  const [sortedTransactions, setSortedTransactions] = useState('');
  const sortTransactions = () => {
    setSortedTransactions([...transactions].sort(
      (filterParametrs.direction.actual === 'increase')
      ? (a, b) => a[filterParametrs.property.actual] - b[filterParametrs.property.actual]
      : (a, b) => b[filterParametrs.property.actual] - a[filterParametrs.property.actual]
    ));
  };
  useEffect(() => {
    sortTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParametrs, transactions]);
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
    updateAccountsAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);
  return (
    <div className="App">
      <TransactionMain
        transactions={transactions}
        setTransactions={setTransactions}
        accounts={accounts}
        sortedTransactions={sortedTransactions}
        filterParametrs={filterParametrs}
        setFilterParametrs={setFilterParametrs}
      />
      <AccountMain
        accounts={accounts}
        setAccounts={setAccounts}
      />
    </div>
  );
}