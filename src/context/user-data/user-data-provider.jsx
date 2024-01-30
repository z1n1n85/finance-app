import React, { useEffect, useState } from 'react'
import {UserDataContext} from './user-data'
import { useFetching } from '../../hooks/use-fetching';
import TransactionService from '../../api/transaction';
import AccountService from '../../api/account';

export default function UserDataProvider({children}) {
  const [transactions, setTransactions] = useState('');
  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  }
  const removeTransaction = (_id) => {
    setTransactions(prev => prev.filter((e) => e._id !== _id));
  }
  const updateTransaction = (transaction) => {
    removeTransaction(transaction._id);
    addTransaction(transaction);
  }

  const [fetchTransactionsGetAll]
  = useFetching(async () => {
    const response = await TransactionService.getAll();
    setTransactions(response.data);
  });
  const [fetchTransactionsCreate] 
  = useFetching(async (transaction) => {
    const response = await TransactionService.create(transaction);
    setTransactions(prev => [...prev, response.data]);
  });
  const [fetchTransactionsUpdate] 
  = useFetching(async (transaction) => {
    const response = await TransactionService.update(transaction);
    updateTransaction(response.data);
  });
  const [fetchTransactionsDelete] 
  = useFetching(async (_id) => {
    await TransactionService.delete(_id);
    removeTransaction(_id);
  });

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
  const [tags, setTags] = useState();

  const [accounts, setAccounts] = useState();
  const addAccount = (account) => {
    setAccounts(prev => [...prev, account]);
  }
  const removeAccount = (_id) => {
    setAccounts(accounts.filter((account) => account._id !== _id));
    transactions.forEach((transaction) => {
      if (transaction.accountId === _id) {
        fetchTransactionsUpdate({...transaction, accountId: ''});
      }
    })
  }

  const [fetchAccountsGetAll]
  = useFetching(async () => {
    const response = await AccountService.getAll();
    setAccounts(response.data);
  });
  const [fetchAccountsCreate]
  = useFetching(async (account) => {
    const response = await AccountService.create(account);
    addAccount(response.data);
  });
  const [fetchAccountUpdate]
  = useFetching(async (account) => {
    await AccountService.update(account);
  });
  const [fetchAccountsDelete]
  = useFetching(async (_id) => {
    await AccountService.delete(_id);
    removeAccount(_id);
  });

  const updateAccountsAmount = () => {
    let accounts_copy = [...accounts];
    accounts.forEach((account, index) => {
      let amount = account.amountStart;
      transactions.filter(
        (transaction) => transaction.accountId === account._id
      ).forEach((transaction) => {
        (transaction.type === 'expenses')
        ? amount -= transaction.cost
        : amount += transaction.cost
      });
      accounts_copy[index].amount = amount;
      fetchAccountUpdate(accounts_copy[index]);
    });
    setAccounts([...accounts_copy]);
  }
  
  useEffect(() => {
    fetchTransactionsGetAll();
    fetchAccountsGetAll();
  }, []);
  useEffect(() => {
    if (accounts) {
      updateAccountsAmount();
    }
    if (transactions) {
      setTags(initTags());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);
  useEffect(() => {
    if (transactions) {
      sortTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParametrs, transactions]);

  return (
    <UserDataContext.Provider value={{
      transactions,
      setTransactions,

      fetchTransactionsCreate,
      fetchTransactionsUpdate,
      fetchTransactionsDelete,

      sortedTransactions,

      filterParametrs,
      setFilterParametrs,

      tags,

      accounts,
      setAccounts,
      removeAccount,
      fetchAccountsCreate,
      fetchAccountsDelete,
    }}>
      {children}
    </UserDataContext.Provider>
  )
}
