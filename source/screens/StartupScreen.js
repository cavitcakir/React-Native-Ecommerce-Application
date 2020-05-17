import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import * as cartActions from '../store/actions/cart';
import * as searchActions from '../store/actions/search';

const StartupScreen = props => {
  const dispatch = useDispatch();


  useSelector(state => state.search.searchString = "CAVITISHERE");
  useEffect(() => {

    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        //   dispatch(searchActions.setSearchInput("CAVITISHERE"));
        //   console.log("i did");
        return;
      }
      dispatch(authActions.authenticate(userData));
      dispatch(cartActions.fetchCart());
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
