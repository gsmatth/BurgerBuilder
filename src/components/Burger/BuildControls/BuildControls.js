import React from 'react';
import styles from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (

      <div className={styles.BuildControls}>
        <p><strong>Price: ${props.price.toFixed(2)}</strong></p>
        { controls.map(control => (
          <BuildControl 
            key={control.label} 
            label={control.label}
            addIngredientHandler={() => props.addIngredientHandler(control.type)}
            removeIngredientHandler={() => props.removeIngredientHandler(control.type)}
            disabled={props.disabled[control.type]}
          />
        )
        )}
        <button 
          onClick={props.ordered}
          className={styles.OrderButton}
          disabled={!props.purchasable}>
          {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>
      </div>
    );

export default buildControls;