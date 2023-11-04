import React, { useState } from 'react'
import Select from './UI/Select/Select'
import Button from './UI/Button/Button'

export default function TransactionFilter({sortTransactions}) {
  const [parametr, setParametr] = useState('');
  const [direction, setDirection] = useState('');
  return (
    <div>
      <Select
        value={parametr}
        basicValue='Сортировать по'
        options={[
          {value: 'cost', name: 'По сумме'},
          {value: 'time', name: 'По дате'},
        ]}
        onChange={e => setParametr(e.target.value)}
      />
      <Select
        value={direction}
        basicValue='Направление'
        options={[
          {value: 'increase', name: 'Возрастание'},
          {value: 'decrease', name: 'Убывание'},
        ]}
        onChange={e => setDirection(e.target.value)}
      />
      <Button
        onClick={() => sortTransactions(parametr, direction)}
      >
        Применить фильтры
      </Button>
    </div>
  )
}
