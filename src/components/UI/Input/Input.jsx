import React from 'react'
import css from './Input.module.css'

function Input({...props}) {
  return (
    <input {...props} className={css.input}/>
  )
}

export default Input