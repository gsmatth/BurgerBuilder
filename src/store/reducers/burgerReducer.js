import * as actionTypes from '../actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
}

const INGREDIENT_PRICES = {
  salad: 0.50,
  cheese: 0.50,
  meat: 1.30,
  bacon: 0.70
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENT:
      console.log('[burgerReducer.js] entered case ADD_INGREDIENT');
      /**
       * we use the ...state.ingredients because the initial spread operation on state below (...state)  creates a shallow copy of the current state, which would not include the individual ingredient property and values in the ingredients object.
       * 
       * the [action.ingredientName] is not an array.  It is ES6 syntax that allows you to dynamically override the property in an object.  In this case, we expect to get the property name as a payload property in the action.
       * 
       * what we end up returning is an updated state object   
       */
      return {
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENT:
      console.log('[burgerReducer.js] entered case REMOVE_INGREDIENT');
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

      }
    default:
      return state;
  }
}

export default reducer;