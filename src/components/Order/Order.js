import React from 'react';
import styles from './Order.css';

const Order = (props) => {

  return (
    <div className={styles.Order}>
      <p>Ingredients: {props.ingredient} </p>
      <p>Price: <strong>USD {props.price}</strong></p>
    </div>
  )
}

export default Order;