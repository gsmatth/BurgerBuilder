import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: localId
  }

}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');


  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  };
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authRequest = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    //this object is defined in the firebase authentication API, Sign up with email/password
    const authData = {
      email:email,
      password:password,
      returnSecureToken: true

    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC3QpWLtNOdiXC6v-bF_73kBEZ-A3ktAyc';
    if(!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC3QpWLtNOdiXC6v-bF_73kBEZ-A3ktAyc';
    }
    axios.post(url, authData)
      .then(response => {
        console.log('[authActionCreator] authRequest response: ', response.data);
        const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
        console.log('[authActionCreator] authRequest() value of expirationDate: ', expirationDate);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error.response.data.error));//this syntax is provided by axios
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if(!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate <= new Date()){
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, userId));
        //getTime() is milliseconds.  There is also a getSeconds()
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }

    }
  }
}

