import React from 'react'
import css from './Modal.module.css'

export default function Modal({children, visible, setVisible}) {

  return (
    <div
      className={visible ? `${css.background} ${css.visible}` : css.background}
      onClick={() => setVisible(false)}
    >
      <div
        className={css.container}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={css.buttonClose}
          onClick={() => setVisible(false)}
        >
          X
        </button>
        {children}
      </div>
    </div>
  )
}