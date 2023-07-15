import React from 'react'
import css from './Modal.module.css'

function Modal({children}) {
  return (
    <div className={css.background}>
      <div className={css.container}>
        {children}
      </div>
    </div>
  )
}

export default Modal