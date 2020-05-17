import Product from '../../models/product';
import axios from 'axios';
import { Platform } from 'react-native'

export const SET_SEARCHED = 'SET_SEARCHED', SET_INPUTSTRING = 'SET_INPUTSTRING', RESET_INPUT = 'RESET_INPUT';


export const fetchSearch = (searchInput) => {
  return async dispatch => {
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 1000,

    });
    instance
      .post("search", { text: searchInput })
      .then((response) => {
        const loadedItems = [];
        for (const key in response.data) {
          loadedItems.push(
            new Product(
              response.data[key].pId.toString(),
              "response.data[key].quantity",
              response.data[key].price,
              response.data[key].oldPrice,
              response.data[key].stock,
              response.data[key].imgSrc,
              response.data[key].price,
              response.data[key].name,
              "response.data[key].modelNo",
              "response.data[key].description",
              "response.data[key].warrantyStatus",
              "response.data[key].disturbuterInfo",
              "response.data[key].listedDate",
              response.data[key].categoryName,
              response.data[key].avgRating,

            )
          );
        }
        dispatch({ type: SET_SEARCHED, searchData: loadedItems });
      })

      .catch((error) => {
        console.log(error);
      });
  };
};

export const setSearchInput = (inputString) => {
  return async dispatch => {
    dispatch({ type: SET_INPUTSTRING, searchString: inputString });
  };
};
export const resetProducts = () => {
  return { type: RESET_INPUT };
};