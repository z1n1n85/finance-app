import React, { useEffect, useState } from 'react';
import '../../styles/index.css'
import TransactionMain from './components/transaction-main/transaction-main';
import AccountMain from './components/account-main/account-main';
import { useFetching } from '../../hooks/use-fetching';
import TransactionService from '../../api/transaction';
import AccountService from '../../api/account';

export default function Home() {
  // TRANSATIONS
  const [transactions, setTransactions] = useState(
    // [{
    //   _id: 1697716121476,
    //   time: 1697716121476,
    //   type: 'expenses',
    //   tags: ['Кафе', 'Перекус'],
    //   cost: 500,
    //   accountId: 1,
    //   description: 'Двойной раф в обеденный перерыв',
    // },
    // {
    //   _id: 1697816121476,
    //   time: 1697816121476,
    //   type: 'income',
    //   tags: ['Зарплата'],
    //   cost: 3000,
    //   accountId: 1,
    //   description: 'Заказ с Habr.Freelance',
    // },
    // {
    //   _id: 1697716541476,
    //   time: 1697716541476,
    //   type: 'expenses',
    //   tags: ['Продукты', 'Перекресток'],
    //   cost: 953,
    //   accountId: 2,
    //   description: 'Молок, котлеты, овощи, коробка конфет',
    // },
    // {
    //   _id: 1695516121476,
    //   time: 1695516121476,
    //   type: 'expenses',
    //   tags: ['Столовая', 'Перекус'],
    //   cost: 120,
    //   accountId: 2,
    //   description: 'Пирожок в столовой',
    // },]
  );
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
  const [fetchTransactionsGetAll, isTransactionsGetAllLoading, transactionsGetAllError]
  = useFetching(async () => {
    const response = await TransactionService.getAll();
    setTransactions(response.data);
  });
  const [fetchTransactionsCreate, isTransactionsCreateLoading, transactionsCreateError] 
  = useFetching(async (transaction) => {
    const response = await TransactionService.create(transaction);
    setTransactions(prev => [...prev, response.data]);
  });
  const [fetchTransactionsUpdate, isTransactionsUpdateLoading, transactionsUpdateError] 
  = useFetching(async (transaction) => {
    const response = await TransactionService.update(transaction);
    updateTransaction(response.data);
  });
  const [fetchTransactionsDelete, isTransactionsDeleteLoading, transactionsDeleteError] 
  = useFetching(async (_id) => {
    const response = await TransactionService.delete(_id);
    removeTransaction(_id);
  });
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
      console.log(transaction);
      transaction.tags.forEach((tag) => {
        (tags.filter((e) => e[0] === tag).length)
        ? tags.filter((e) => e[0] === tag)[0][1] += 1
        : tags.push([tag, 1])
      })
    });
    return tags;
  } 
  const [tags, setTags] = useState();
  // ACCOUNTS
  const [accounts, setAccounts] = useState(
    // [{
    //   _id: 1,
    //   name: 'Mastercard',
    //   amountStart: 1000,
    //   amount: 3500,
    // },
    // {
    //   _id: 2,
    //   name: 'Visa',
    //   amountStart: 1500,
    //   amount: 427,
    // }]
  );
  const addAccount = (account) => {
    setAccounts(prev => [...prev, account]);
  }
  const removeAccount = (_id) => {
    setAccounts(accounts.filter((account) => account._id !== _id));
    // setTransactions([...transactions].map((transaction) => {
    //   if (transaction.accountId === _id){
    //     return {...transaction, accountId: ''};
    //   } else {
    //     return transaction;
    //   }
    // }));
    transactions.forEach((transaction) => {
      if (transaction.accountId === _id) {
        fetchTransactionsUpdate({...transaction, accountId: ''});
      }
    })
  }
  const [fetchAccountsGetAll, isAccountsGetAllLoading, accountsGetAllError]
  = useFetching(async () => {
    const response = await AccountService.getAll();
    setAccounts(response.data);
  });
  const [fetchAccountsCreate, isAccountsCreateLoading, accountsCreateError]
  = useFetching(async (account) => {
    const response = await AccountService.create(account);
    addAccount(response.data);
  });
  const [fetchAccountUpdate, isAccountsUpdateLoading, accountsUpdateError]
  = useFetching(async (account) => {
    const response = await AccountService.update(account);
  });
  const [fetchAccountsDelete, isAccountsDeleteLoading, accountsDeleteError]
  = useFetching(async (_id) => {
    const response = await AccountService.delete(_id);
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
    <div className="home">
      <TransactionMain
        transactions={transactions}
        setTransactions={setTransactions}
        accounts={accounts}
        sortedTransactions={sortedTransactions}
        filterParametrs={filterParametrs}
        setFilterParametrs={setFilterParametrs}
        fetchTransactionsCreate={fetchTransactionsCreate}
        fetchTransactionsUpdate={fetchTransactionsUpdate}
        fetchTransactionsDelete={fetchTransactionsDelete}
        tags={tags}
      />
      <AccountMain
        accounts={accounts}
        setAccounts={setAccounts}
        removeAccount={removeAccount}
        fetchAccountsCreate={fetchAccountsCreate}
        fetchAccountsDelete={fetchAccountsDelete}
      />
    </div>
  );
}