import * as actionTypes  from './actionTypes';
import axios from '../../axios-orders';

//convention is to use the same name as in actionTypes, but use camelCase
export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredient
  };
};

export const removeIngredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredient
  };
};
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    action: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}
/**
 * thunk middleware wraps itself around the dispatch action and does not allow the dispatch to communicate with the reducer until the async code has completed executing. "dispatch" is made available by funk below.
 */
export const initialIngredients = () => {
  return dispatch => {
    //i can use asyn code in here and dispatch a new action when the async code completes
      //async code runs here
        axios.get('https://react-my-burger-58e7d.firebaseio.com/ingredients.json')
      .then( response => {
        //dispatch new action now. dispatch is made available by redux-thunk
        dispatch(setIngredients(response.data));
        })
        .catch(err => {
         dispatch(fetchIngredientsFailed());
        })
  }
}

