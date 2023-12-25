import React from 'react'
import css from './Select.module.css'

export default function Select({options, basicValue, ...props}) {
  return (
    <select className={css.select} {...props}>
      {(basicValue) ? <option value='' disabled>{basicValue}</option> : ''}
      {(options)
        ?
        options.map(option => 
          <option value={option.value}>{option.name}</option>
        )
        : ''
      }
    </select>
  )
}
