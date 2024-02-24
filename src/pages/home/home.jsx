import React from 'react';
import '../../styles/index.css'
import UserDataProvider from '../../context/user-data/user-data-provider';
import TransactionMain from './components/transaction-main/transaction-main';
import AccountMain from './components/account-main/account-main';
import Page from 'components/UI/page';

export default function Home() {
  return (
    <Page>
      <UserDataProvider>
        <div className='grid sm:grid-cols-2 gap-4 w-full md:w-3/4'>
          <TransactionMain/>
          <AccountMain/>
        </div>
      </UserDataProvider>
    </Page>
  );
}