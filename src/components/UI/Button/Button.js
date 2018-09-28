import React from 'react';
import styles from './Button.css';

/**
 * 
 * className has to be a string.  We join the styles to produce a single, stand alone string  outside of the array, instead of two separate entries contained in an array. 
 */
const Button = (props) => (
  <button 
    onClick={props.clicked}
    className={[styles.Button, styles[props.btnType]].join(' ')}>
    {props.children}
  </button>

);

export default Button;