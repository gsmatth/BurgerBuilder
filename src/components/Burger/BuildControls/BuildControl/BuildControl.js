import React from 'react';
import styles from './BuildControl.css';

const buildControl = (props) => {
return (
  <div className={styles.BuildControl}>
    <div className={styles.label}>{props.label}</div>
    <button 
      className={styles.Less} 
      onClick={props.removeIngredientHandler}
      disabled={props.disabled}>
      Less
      </button>
    <button 
      className={styles.More} 
      onClick={props.addIngredientHandler}
      >
      More
      </button>
  </div>
);
}

export default buildControl;