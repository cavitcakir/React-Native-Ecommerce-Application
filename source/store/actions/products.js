import Product from '../../models/product';

export const SET_PRODUCTS = 'SET_PRODUCTS';
import { Platform } from 'react-native';

export const fetchProducts = () => {
  return async dispatch => {
    const response = await fetch(
      Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/filterProduct?count=50' : 'http://localhost:8000/api/filterProduct?count=50'
    );
    const resData = await response.json();
    const loadedProducts = [];
    for (const key in resData) {
      loadedProducts.push(
        new Product(
          resData[key].pId.toString(),
          resData[key].quantity,
          resData[key].price,
          resData[key].oldPrice,
          resData[key].stock,
          resData[key].imgSrc,
          resData[key].cost,
          resData[key].name,
          resData[key].modelNo,
          resData[key].description,
          resData[key].warrantyStatus,
          resData[key].disturbuterInfo,
          resData[key].listedDate,
          resData[key].categoryName,
          resData[key].avgRating,
          resData[key].displayOldPrice
        )
      );

    }

    dispatch({ type: SET_PRODUCTS, products: loadedProducts });
  };
};
