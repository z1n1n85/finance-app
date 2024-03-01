import React from 'react';
import 'styles/index.css'
import { UserDataProvider } from 'context/user-data/user-data-provider';
import { Page } from 'components/UI/page';
import { TransactionMain } from 'pages/home/components/transaction-main/transaction-main';
import { AccountMain } from 'pages/home/components/account-main/account-main';

export function Home() {
  return (
    <Page>
      <UserDataProvider>
        <div className='grid sm:grid-cols-2 gap-4 w-full md:w-3/4 items-start'>
          <AccountMain/>
          <TransactionMain/>
        </div>
      </UserDataProvider>
    </Page>
  );
}