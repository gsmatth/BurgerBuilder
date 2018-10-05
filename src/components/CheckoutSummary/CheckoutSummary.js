import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import styles from './CheckoutSummary.css';

const CheckoutSummary = (props) => {

  return (
    <div className={styles.CheckoutSummary}>
      <h1>Does it taste good</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button 
        btnType="Danger"
        >
        CANCEL
      </Button>
      <Button 
        btnType="Success"
        >
        CONTINUE
      </Button>
    </div>
  );
}

export default CheckoutSummary;