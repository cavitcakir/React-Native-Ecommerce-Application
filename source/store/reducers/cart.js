import { ADD_TO_CART, REMOVE_FROM_CART, SET_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      const cartDatas = action.cartData;
      let newItems = {};
      let newAmount = 0;
      cartDatas.forEach(addedProduct => {

        const prodPrice = addedProduct.price * addedProduct.quantity;
        const prodTitle = addedProduct.name;
        const prodQuant = addedProduct.quantity;

        let cartItem = new CartItem(prodQuant, prodPrice, prodTitle, prodPrice);
        newItems = { ...newItems, [addedProduct.id]: cartItem };
        newAmount = newAmount + prodPrice;
      });
      return {
        ...state,
        items: newItems,
        totalAmount: newAmount
      };

  }
  return state;
};
