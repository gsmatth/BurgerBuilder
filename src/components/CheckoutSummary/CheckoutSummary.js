import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import styles from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
  console.log('[CheckoutSummary.js] entered and value of props: ', props);

  return (
    <div className={styles.CheckoutSummary}>
      <h1>Does it taste good</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked={props.cancelOrder}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.placeOrder}>
        CONTINUE
      </Button>
    </div>
  );
}

export default CheckoutSummary;