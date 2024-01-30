import React from 'react';
import '../../styles/index.css'
import UserDataProvider from '../../context/user-data/user-data-provider';
import TransactionMain from './components/transaction-main/transaction-main';
import AccountMain from './components/account-main/account-main';

export default function Home() {
  return (
    <div className="page home">
      <UserDataProvider>
        <TransactionMain/>
        <AccountMain/>
      </UserDataProvider>
    </div>
  );
}