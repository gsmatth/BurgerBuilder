import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const INGREDIENT_PRICES = {
  salad: 0.50,
  cheese: 0.50,
  meat: 1.30,
  bacon: 0.70
}

     /**
       * we use the ...state.ingredients because the initial spread operation on state below (...state)  creates a shallow copy of the current state, which would not include the individual ingredient property and values in the ingredients object.
       * 
       * the [action.ingredientName] is not an array.  It is ES6 syntax that allows you to dynamically override the property in an object.  In this case, we expect to get the property name as a payload property in the action.
       * 
       * what we end up returning is an updated state object   
       */
const addIngredient = (state, action) => {
  console.log('[burgerReducer.js] entered case ADD_INGREDIENT');
  return {
    ...state,
    ingredients:{
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  }
}

const removeIngredient = (state, action) => {
  console.log('[burgerReducer.js] entered case REMOVE_INGREDIENT');
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

      }
}

const setIngredients = (state, action) => {
  console.log('[burgerBuilderReducer] entered case SET_INGREDIENTS');
        return {
          ...state,
          ingredients: action.ingredients,
          totalPrice: initialState.totalPrice,
          error: false
        }
}

const fetchIngredientsFailed = (state, action) => {
  console.log('[burgerBuilderReducer] entered case FETCH_INGREDIENTS_FAILED');
  return {
    ...state,
    error: true
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);    
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:  return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
}

export default reducer;