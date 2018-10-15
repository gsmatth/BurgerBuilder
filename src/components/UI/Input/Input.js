import React from 'react';
import styles from './Input.css';

const Input = (props) => {
  let inputElement = null;
  const inputStyles = [styles.InputElement];
  if(props.invalid  && props.shouldValidate && props.touched){
    inputStyles.push(styles.Invalid);
  }
  switch (props.elementtype) {
    case 'input':
      inputElement = <input  
        className={inputStyles.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case 'textarea':
      inputElement = <textarea
        className={inputStyles.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
      break;
    case 'select':
      inputElement = (
        <select
            className={inputStyles.join(' ')}
            value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(option => (
                <option key={option.value} value={option.value}>{option.displayValue}</option>
            ))}
        </select> 
    );
      break;
    default:
      inputElement = <input
        className={inputStyles.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input