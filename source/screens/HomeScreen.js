import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native'; import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import ProductItem from '../components/shop/ProductItem';
import * as productsActions from '../store/actions/products';
import * as searchActions from '../store/actions/search';
import * as cartActions from '../store/actions/cart';
import Colors from '../constants/Colors';

const HomeScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, name) => {
    props.navigation.navigate('ItemDetail', {
      id: id, name: name
    });
  };

  if (error) {
    console.log(error);
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }


  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }


  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }


  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      contentContainerStyle={{ margin: 4 }}
      horizontal={false}
      numColumns={2}
      style={{ flexDirection: 'column' }}
      renderItem={itemData => (
        <ProductItem
          pID={itemData.item.pId}
          imgSrc={itemData.item.imgSrc}
          name={itemData.item.name}
          oldPrice={itemData.item.oldPrice}
          price={itemData.item.price}
          categoryName={itemData.item.categoryName}
          avgRating={itemData.item.avgRating}
          displayOldPrice={itemData.item.displayOldPrice}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.name);
          }}

        >

        </ProductItem>
      )}
    />
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Featured Products',
    headerTintColor: Colors.primary,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navData.navigation.navigate('Cart')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default HomeScreen;
