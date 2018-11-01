import React from 'react';
import styles from './Order.css';

const Order = (props) => {
  
    /**    we want to create an array of objects from the props.ingredients object.  */

  const ingredients = [];
  
  for (let ingredientName in props.ingredients){
    ingredients.push({
      name: ingredientName, 
      amount: props.ingredients[ingredientName]});
  }
  
  const ingredientOutput = ingredients.map(ingredient => {
    return (
      <span key={ingredient.name}>{`${ingredient.name}: ${ingredient.amount}`}</span>
    )
  })
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientOutput} </p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  )
}

export default Order;