import React from 'react';
import css from './Button.module.css';

function Button({children, ...props}) {
  return (
    <button className={css.btn} {...props}>
      {children}
    </button>
  )
}

export default Button