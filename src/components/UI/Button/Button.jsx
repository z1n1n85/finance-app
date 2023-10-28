import React from 'react';
import css from './Button.module.css';

export default function Button({children, ...props}) {
  return (
    <button className={css.btn} {...props}>
      {children}
    </button>
  )
}