import { AsyncStorage, Platform } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const USERNAME = 'USERNAME';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

import axios from 'axios';


export const authenticate = (token) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, token: token });
  };
};

export const signup = (username, email, password) => {
  return async dispatch => {
    const { data } = await axios.post(
      Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/signup/' : 'http://localhost:8000/api/signup',
      {
        username,
        email,
        password,
      });
    console.log(data);
    if (!data.access) {
      const errorResData = await data.json();
      const errorId = errorResData.status;
      let message = 'Something went wrong!';
      if (errorId === 400) {
        message = 'Email or Password is wrong!';
      }
      throw new Error(message);
    }

    dispatch(
      authenticate(
        "data.access"
      )
    );
  };
};

export const login = (username, password) => {
  return async dispatch => {
    const { data } = await axios.post(
      Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/login/' : 'http://localhost:8000/api/login/',
      { username, password });

    if (!data.access) {
      const errorResData = await data.json();
      const errorId = errorResData.status;
      let message = 'Something went wrong!';
      if (errorId === 400) {
        message = 'Email or Password is wrong!';
      }
      throw new Error(message);
    }

    dispatch(
      authenticate(
        data.access
      )
    );
    saveDataToStorage("JWT " + data.access);
  };
};

export const logout = () => {
  console.log("logout");
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};




const saveDataToStorage = (token) => {
  AsyncStorage.setItem(
    'userData', token
  );
};
