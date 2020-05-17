import Order from '../../models/order';
import axios from 'axios';

import {
  AsyncStorage, Platform
} from 'react-native';

export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    let myToken = await AsyncStorage.getItem('userData');
    if (myToken == null) {
      alert("please login to add basket")
      return null;
    }

    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 1000,
      headers: {
        Authorization: myToken
      },
    });

    instance
      .post("orders", { "mobile": "yes" })
      .then((response) => {
        const loadedOrders = [];
        for (const key in response.data) {
          loadedOrders.push(
            new Order(
              key.toString(),
              response.data[key].items,
              response.data[key].totalPrice,
              response.data[key].time
            )
          );
        }

        dispatch({ type: SET_ORDERS, orders: loadedOrders });
      })

      .catch((error) => {
        console.log(error);
      });

  }
};

