import React from 'react'
import css from './Textarea.module.css'

export default function Textarea({...props}) {
  return (
    <textarea {...props} className={css.textarea}>
    </textarea>
  )
}
