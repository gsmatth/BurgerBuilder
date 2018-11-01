import reducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';
describe('auth reducer', () => {
  it('should return the initial state via "default" case', () => {
    //pass state "undefined", action "{}" to reducer.  The returned state, should equal the initial state of the authReducer
    expect(reducer(undefined, {})).toEqual({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/',
    })
  });
  it('should store the token and userId upon login with AUTH_SUCCESS', () => {
     const initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
  }
    const action = {
      type: actionTypes.AUTH_SUCCESS,
      idToken:'some-token',
      userId: 'some-user-id'
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      token: 'some-token',
      userId: 'some-user-id'
    })
  })
});
