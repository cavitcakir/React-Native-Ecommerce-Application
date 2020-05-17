import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Platform,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';

import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddress, setIsAddress] = useState("");
  const [myAddresses, setMyAddress] = useState([]);
  const [error, setError] = useState();

  let dummy = [];
  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadItem
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadItem]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(cartActions.fetchCart());
    loadItem().then(() => {
      setIsLoading(false);
    });
    setIsLoading(false);
  }, [dispatch, loadItem]);


  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice.toFixed(2),
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum.toFixed(2)
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();



  const deneme = async () => {
    let myToken = await AsyncStorage.getItem('userData');
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 5000,
      headers: {
        Authorization: myToken,
      },
    });
    await instance
      .get("seeMyAddress")
      .then((response) => {
        response.data.forEach(address => {
          dummy.push({ value: address.address });
        });
      })
      .catch((error) => {
        setError(err.message);
        setError("wow");
      });
  }

  const handler = (value) => {
    setIsAddress(value);
  };


  const loadItem = useCallback(async () => {
    setError(null);
    try {
      await deneme();
      setMyAddress(dummy);

    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);


  const sendOrderHandler = async () => {
    let myToken = await AsyncStorage.getItem('userData');
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 5000,
      headers: {
        Authorization: myToken,
      },
    });
    instance
      .post("buyBasket", { "address": isAddress, })
      .then((response) => {
        dispatch(cartActions.fetchCart());
        alert("Successful!");
      })

      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <ScrollView>
      <View style={styles.screen}>

        <Card style={styles.summary}>
          <Text style={styles.summaryText}>
            Total:{' '}
            <Text style={styles.amount}>
              {cartTotalAmount.toFixed(2)} TL
          </Text>
          </Text>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
              <Button
                color={Colors.primary}
                title="Order Now"
                disabled={cartItems.length === 0 || !isAddress}
                onPress={sendOrderHandler}

              />
            )}
        </Card>

        <Dropdown
          label='Choose Delivery Address'
          data={myAddresses}
          onChangeText={(value) => handler(value)}
          baseColor={Colors.primary}
          selectedItemColor={Colors.primary}
          itemTextStyle={{ fontSize: 15 }}
          fontSize={18}
        />



        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
              increment={() => {
                dispatch(cartActions.updateCart(itemData.item.productId, itemData.item.quantity + 1));
              }}
              decrement={() => {
                if (itemData.item.quantity == 1) {
                  dispatch(cartActions.removeFromCart(itemData.item.productId));
                } else {
                  dispatch(cartActions.updateCart(itemData.item.productId, itemData.item.quantity - 1));
                }
              }}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
  headerTintColor: Colors.primary,
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: Colors.primary,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: 'green'
  }
});

export default CartScreen;
