import React, { useContext } from 'react';
import { CreditCard } from 'lucide-react';
import { Badge } from "components/UI/badge"
import { Button } from 'components/UI/button';
import { UserDataContext } from 'context/user-data/user-data';
import { formatDateMonth } from 'utils/date';
import Modal from 'components/UI/modal';
import TransactionFormUpdate from '../transaction-form-update/transaction-form-update';
import ModalTransactionUpdate from 'pages/home/components/modal-transaction-update/modal-transaction-update';

export default function TransactionItem({
  transaction
}) {
  const { accounts, fetchTransactionsDelete } = useContext(UserDataContext);

  const getAccountName = () => {
    if (accounts) {
      const account = accounts.filter((account) =>
        account._id === transaction.accountId
      )[0];
      return (account) ? account.name : 'Отсутствует';
    } else {
      return 'Отсутствует';
    }
  }

  return (
    <div>
      {(transaction.type === 'expenses')
        ? <h2 className='text-lg font-bold text-red-600'>-{transaction.cost} ₽</h2>
        : <h2 className='text-lg font-bold text-green-600'>+{transaction.cost} ₽</h2>}
      {transaction.tags.map((tag, index) =>
        <Badge key={index} variant="secondary" className='mr-1'>{tag}</Badge>
      )}
      <p className='font-medium'><CreditCard className='w-5 h-5 inline mr-1' />{getAccountName()}</p>
      <p className='text-sm'>{transaction.description}</p>
      <p className='text-gray-500 text-xs'>{formatDateMonth(transaction.time)}</p>
      <ModalTransactionUpdate
        triggerElement={
          <Button variant="secondary" className='mr-2 px-2 py-1 text-xs h-8 mt-2'>
            Редактировать
          </Button>
        }
        transactionUpdate={transaction}
      />
      {/* <Modal
        title='Редактировать операцию:'
        triggerElement={
          <Button variant="secondary" className='mr-2 px-2 py-1 text-xs h-8 mt-2'>
            Редактировать
          </Button>
        }
        content={
          <TransactionFormUpdate
            transactionUpdate={transaction}
          />
        }
      /> */}
      <Button variant="destructive" className='px-2 py-1 text-xs h-8 mt-2' onClick={() => fetchTransactionsDelete(transaction._id)}>
        Удалить
      </Button>
    </div>
  )
}