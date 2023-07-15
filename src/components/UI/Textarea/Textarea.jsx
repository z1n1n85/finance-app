import React from 'react'
import css from './Textarea.module.css'

function Textarea({...props}) {
  return (
    <textarea {...props} className={css.textarea}>
    </textarea>
  )
}

export default Textarea