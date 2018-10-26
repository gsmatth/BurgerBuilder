import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseStart = (state, action) => {
  console.log('[orderReducer] entered case PURCHASE_BURGER_START');
  return {
    ...state,
    loading: true
  };
}

const purchaseBurgerSuccess = (state, action) => {
  console.log('[orderReducer] entered case PURCHASE_BURGER_SUCCESS');
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  }
  return {
    ...state,
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  };
}
const purchaseBurgerFail = (state, action) => {
  console.log('[orderReducer] entered case PURCHASE_BURGER_FAIL');
  return {
    ...state,
    loading: false,
  };
}

const purchaseInit = (state, action) => {
  console.log('[orderReducer] entered case PURCHASE_INIT');
  return {
    ...state,
    purchased: false
  };
}

const fetchOrderStart = (state, action) => {
  console.log('[orderReducer] entered case FETCH_ORDERS_START')
  return {
    ...state,
    loading: true
  };
}

const fetchOrderSuccess = (state, action) => {
  console.log('[orderReducer] entered case FETCH_ORDERS_SUCCESS');
  return {
    ...state,
    orders: action.orders,
    loading: false
  };
}

const fetchOrderFail = (state, action) => {
  console.log('[orderReducer] entered case FETCH_ORDERS_FAIL');
  return {
    ...state,
    loading: false
  }
}
const reducer = (state = initialState, action) => {
 switch(action.type){
  case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state, action);
  case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
  case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
  case actionTypes.PURCHASE_INIT:return purchaseInit(state, action);
  case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);
  case actionTypes.FETCH_ORDERS_SUCCESS:  return fetchOrderSuccess(state, action);
  case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);
  default: return state;
 }
}

export default reducer;