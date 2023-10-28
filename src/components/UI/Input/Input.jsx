import React from 'react'
import css from './Input.module.css'

export default function Input({...props}) {
  return (
    <input {...props} className={css.input}/>
  )
}