export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SET_CART = 'SET_CART';
import {
  AsyncStorage, Platform
} from 'react-native';
import axios from 'axios';
import Product from '../../models/product';

export const fetchCart = () => {
  return async dispatch => {
    let myToken = await AsyncStorage.getItem('userData');
    if (myToken == null) {
      alert("please login to add basket")
      return null;
    }
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 1000,
      headers: {
        Authorization: myToken,
      },

    });
    instance
      .get("seeBasket")
      .then((response) => {
        const loadedItems = [];
        for (const key in response.data) {
          loadedItems.push(
            new Product(
              response.data[key].pId.toString(),
              response.data[key].quantity,
              response.data[key].price,
              response.data[key].oldPrice,
              response.data[key].stock,
              "https://loremflickr.com/640/360",
              response.data[key].cost,
              response.data[key].name,
              response.data[key].modelNo,
              response.data[key].description,
              response.data[key].warrantyStatus,
              response.data[key].disturbuterInfo,
              response.data[key].listedDate,
              response.data[key].categoryName
            )
          );
        }
        dispatch({ type: SET_CART, cartData: loadedItems });
      })

      .catch((error) => {
        console.log(error);
      });
  };
};



export const addToCart = product => {
  return async dispatch => {
    let myToken = await AsyncStorage.getItem('userData');
    if (myToken == null) {
      alert("please login to add basket")
      return null;
    }
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 1000,
      headers: {
        Authorization: myToken,
      },

    });
    instance
      .post("addBasket", { "quantity": 1, "totalPrice": product.cost, "pId": product.pId, })
      .then((response) => {
        //console.log(response.data.length);
        dispatch(fetchCart())
      })

      .catch((error) => {
        console.log(error);
      });
  };
};

export const removeFromCart = productId => {
  return async dispatch => {
    let myToken = await AsyncStorage.getItem('userData');
    if (myToken == null) {
      alert("please login to remove from basket")
      return null;
    }
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 1000,
      headers: {
        Authorization: myToken,
      },

    });
    instance
      .post("dellBasket", { "quantity": 1, "pId": productId, })
      .then((response) => {
        dispatch(fetchCart())
      })

      .catch((error) => {
        console.log(error);
      });
  };
};


export const updateCart = (pId, quantity) => {
  return async dispatch => {
    let myToken = await AsyncStorage.getItem('userData');
    if (myToken == null) {
      alert("please login to add basket")
      return null;
    }
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 1000,
      headers: {
        Authorization: myToken,
      },

    });
    instance
      .post("updateBasket", { "quantity": quantity, "pId": pId, })
      .then((response) => {
        //console.log(response.data.length);
        dispatch(fetchCart())
      })

      .catch((error) => {
        console.log(error);
      });
  };
};
