import Category from '../../models/category';

export const SET_CATEGORIES = 'SET_CATEGORIES';
import {
  AsyncStorage, Platform
} from 'react-native';

export const fetchCategories = () => {
  return async dispatch => {
    const response = await fetch(
      Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/allCategories' : 'http://localhost:8000/api/allCategories'
    );

    const resData = await response.json();
    const loadedCategories = [];
    for (const key in resData) {
      loadedCategories.push(
        new Category(
          resData[key].categoryName,
          "https://cdn.icon-icons.com/icons2/912/PNG/512/right-dark-arrow_icon-icons.com_71585.png"
        )
      );

    }

    dispatch({ type: SET_CATEGORIES, categories: loadedCategories });
  };
};
