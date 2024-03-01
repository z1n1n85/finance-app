import React, { useContext } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/UI/select'
import { UserDataContext } from 'context/user-data/user-data'

export function TransactionFilter() {
  const { filterParametrs, setFilterParametrs } = useContext(UserDataContext);

  return (
    <div className='grid gap-2 ld:grid-cols-2'>
      <Select
        defaultValue={filterParametrs.property.actual}
        onValueChange={value => setFilterParametrs({
          ...filterParametrs,
          property: {
            ...filterParametrs.property,
            actual: value
          }
        })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder='Сортировать по...' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
          <SelectItem value={false}>Сортировать по...</SelectItem>
            {filterParametrs.property.options.map((option) => 
              <SelectItem value={option.value}>{option.label}</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        defaultValue={filterParametrs.direction.actual}
        onValueChange={value => setFilterParametrs({
          ...filterParametrs,
          direction: {
            ...filterParametrs.direction,
            actual: value
          }
        })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder='В направлении...' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
          <SelectItem value={false}>В направлении...</SelectItem>
            {filterParametrs.direction.options.map(option => 
              <SelectItem value={option.value}>{option.label}</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
