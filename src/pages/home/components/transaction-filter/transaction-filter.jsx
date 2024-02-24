import React, { useContext } from 'react'
import {Select} from 'components/UI/select'
import { UserDataContext } from 'context/user-data/user-data'

export default function TransactionFilter() {
  const {filterParametrs, setFilterParametrs} = useContext(UserDataContext);

  return (
    <div className='grid gap-2 ld:grid-cols-2'>
      <Select
        startValue={filterParametrs.property.actual}
        placeholder='Сортировать по...'
        options={filterParametrs.property.options}
        onChange={value => setFilterParametrs({
          ...filterParametrs,
          property: {
            ...filterParametrs.property,
            actual: value
          }
        })}
      />
      <Select
        startValue={filterParametrs.direction.actual}
        placeholder='В направлении...'
        options={filterParametrs.direction.options}
        onChange={value => setFilterParametrs({
          ...filterParametrs,
          direction: {
            ...filterParametrs.direction,
            actual: value
          }
        })}
      />
    </div>
  )
}
