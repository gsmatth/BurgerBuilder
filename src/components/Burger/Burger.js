import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.css';

const Burger = (props) =>  {
/*
we want to return the number of jsx elements for a specific ingredient based on the value of the specific ingredient in the props.ingredients object.  ie, cheese: 2
We start by using the Object.keys method to creating a new array  from the props.ingredients object.  The new array contains the ingredient names, not the values, from the props.ingredients object.
*/
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientName => {
      /* then we create an array for each ingredient.  The length of the array is the value of the [ingredientName] in the return statement below
      */
      return [...Array(props.ingredients[ingredientName])]
      /*
      we iterate over the array we created in the previous step,  and produce a new array for each key which contains the same number of BurgerIngredient jsx elements, as the length  of the input array from previous step
      */
        .map((_, i) => {
          return <BurgerIngredient key={ingredientName + i} type={ingredientName} />
        });
      })
      /*
      we reduce the array of arrays returned in the previous step to a single array, containing objects(jsx objects).  The reduce function takes two arguments.  The first is the callback to call on each element. The second is the 'initial' value, which we have set as an empty array '[]' in the last argument in the reduce function .  The prevValue is maintained by the function and updated each iteration.  The first time the function runs, the prevValue is the initial value, which we defined as an empty array. 
      */
      .reduce((prevValue, currentValue) => {
          return prevValue.concat(currentValue);
      }, []);
    ;
    console.log('tranformedIngredients Array: ',transformedIngredients);

  if(transformedIngredients.length === 0){
    transformedIngredients = 'please start adding ingredients';
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );

};

export default Burger;