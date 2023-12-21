import React from 'react'
import Select from './UI/Select/Select'

export default function TransactionFilter({
  filterParametrs, 
  setFilterParametrs
}) {
  return (
    <div>
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
    </div>
  )
}
