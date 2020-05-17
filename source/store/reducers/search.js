
import {
  SET_SEARCHED,
  SET_INPUTSTRING,
  RESET_INPUT
} from '../actions/search';

const initialState = {
  searchString: "",
  searchedProducts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCHED:
      return {
        searchedProducts: action.searchData
      };
    case SET_INPUTSTRING:
      console.log(action.searchString);
      return {
        searchString: action.searchString
      };
    case RESET_INPUT:
      return {
        searchedProducts: []
      };
    default: {
      return {
        ...state
      }
    }
  }

};
