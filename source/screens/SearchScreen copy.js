import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'; import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import SearchInput from '../components/UI/SearchInput';

import HeaderButton from '../components/UI/HeaderButton';
import ProductItem from '../components/shop/ProductItem';
import * as searchActions from '../store/actions/search';
import * as cartActions from '../store/actions/cart';
import Colors from '../constants/Colors';

const SearchScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [userInput, setUserInput] = useState("");
  const [trigger, setTrigger] = useState("");
  let products = useSelector(state => state.search.searchedProducts);

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      if (userInput == "") {
        await dispatch(searchActions.fetchSearch("CAVITISHERE"));
      }
      else {
        await dispatch(searchActions.fetchSearch(userInput));
      }
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError, trigger, userInput]);


  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts, trigger, userInput]);

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
          style={flex = 2}
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



  const inputChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    setUserInput(inputValue);
  };

  const elma = () => {
    setTrigger(Math.random());
  }

  if (!isLoading && products.length === 0 && userInput != "") {
    return (
      <View>
        <View style={styles.search}>
          <SearchInput
            id="Search"
            label=""
            autoCapitalize="none"
            onInputChange={inputChangeHandler}

            initialValue=""
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => { elma() }}
          >
            <Image
              style={styles.image}
              source={require('../assets/search.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.search}>
          <Text>No products found. Maybe try another search!</Text>
        </View>
      </View>
    );
  } else if ((!isLoading && products.length === 0 && userInput == "") || (!isLoading && products.length != 0 && userInput == "")) {
    return (
      <View>
        <View style={styles.search}>
          <SearchInput
            id="Search"
            label=""
            autoCapitalize="none"
            onInputChange={inputChangeHandler}

            initialValue=""
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => { elma() }}
          >
            <Image
              style={styles.image}
              source={require('../assets/search.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  return (
    <View>
      <View style={styles.search}>
        <SearchInput
          id="Search"
          label=""
          autoCapitalize="none"
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => { elma() }}
        >
          <Image
            style={styles.image}
            source={require('../assets/search.png')}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        contentContainerStyle={{ margin: 4 }}
        horizontal={false}
        numColumns={2}
        style={{ flexDirection: 'column' }}
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ProductItem
            pID={itemData.item.pId}
            imgSrc={itemData.item.imgSrc}
            categoryName={itemData.item.categoryName}
            name={itemData.item.name}
            price={itemData.item.price}
            oldPrice={itemData.item.oldPrice}
            avgRating={itemData.item.avgRating}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.name);
            }}

          >
          </ProductItem>
        )}
      />
    </View>
  );
};

SearchScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Search',
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
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  search: {
    flexDirection: 'row',
    justifyContent: "space-around",
    paddingRight: 15,
    paddingTop: 10
  },
  image: {
    height: 25,
    width: 25
  },
  button: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ff6f00',
    borderWidth: 1,
    borderRadius: 15,
  }
});

export default SearchScreen;
