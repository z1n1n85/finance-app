import React, { useContext } from 'react'
import Select from '../../../../components/UI/Select/Select'
import { UserDataContext } from '../../../../context/user-data/user-data'

export default function TransactionFilter() {
  const {filterParametrs, setFilterParametrs} = useContext(UserDataContext);

  return (
    <>
      <Select
        value={filterParametrs.property.actual}
        basicValue='Сортировать по'
        options={filterParametrs.property.options}
        onChange={e => setFilterParametrs({
          ...filterParametrs,
          property: {
            ...filterParametrs.property,
            actual: e.target.value
          }
        })}
      />
      <Select
        value={filterParametrs.direction.actual}
        basicValue='Направление'
        options={filterParametrs.direction.options}
        onChange={e => setFilterParametrs({
          ...filterParametrs,
          direction: {
            ...filterParametrs.direction,
            actual: e.target.value
          }
        })}
      />
    </>
  )
}
