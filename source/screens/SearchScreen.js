import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import SearchInput from '../components/UI/SearchInput';
import FilterInput from '../components/UI/FilterInput';
import { Dropdown } from 'react-native-material-dropdown';

import HeaderButton from '../components/UI/HeaderButton';
import ProductItem from '../components/shop/ProductItem';
import Colors from '../constants/Colors';

const SearchScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [userInput, setUserInput] = useState("");
  const [trigger, setTrigger] = useState("");
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState(true);
  const [orderBy, setorderBy] = useState("name");
  const [minInput, setMinInput] = useState(0);
  const [maxInput, setMaxInput] = useState(99999);
  const [ratingFilter, setRatingFilter] = useState(0);

  const [showFilters, setshowFilters] = useState(false);


  const dispatch = useDispatch();
  let dummy;

  const deneme = async () => {
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 5000,
    });


    await instance
      .post("advanceSearch", { text: userInput, option: sortBy, orderBy: orderBy, rating: ratingFilter, priceLow: minInput, priceHigh: maxInput })
      .then((response) => {
        dummy = response.data;
      })
      .catch((error) => {
        dummy = [];
        setError(error.message);
      });
  }

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      if (trigger != "") {
        await deneme();
        setProducts(dummy);
      }
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError, trigger]);


  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts, trigger]);

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
  const minChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    if (inputValue == "" || inputValue == undefined) {
      setMinInput(1);
    }
    else if (inputValue >= 0 && inputValue <= 100000000) {
      setMinInput(inputValue);
    }
  }
  const maxChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    if (inputValue == "" || inputValue == undefined) {
      setMaxInput(99999);
    }
    else if (inputValue >= 0 && inputValue <= 100000000) {
      setMaxInput(inputValue);
    }
  };

  const elma = () => {
    setTrigger(Math.random());
  }
  const sortHandler = (value) => {
    if (value == "A-Z Name") {
      setorderBy("name");
      setSortBy(true);
    }
    else if (value == "Z-A Name") {
      setorderBy("name");
      setSortBy(false);
    }
    else if (value == "Decreasing Price") {
      setorderBy("price");
      setSortBy(false);
    }
    else {
      setorderBy("price");
      setSortBy(true);
    }
  };

  const ratingHandler = (value) => {
    if (value == "None") {
      setRatingFilter(0);
    }
    else if (value == "1 and above") {
      setRatingFilter(1);
    }
    else if (value == "2 and above") {
      setRatingFilter(2);
    }
    else if (value == "3 and above") {
      setRatingFilter(3);
    }
    else if (value == "4 and above") {
      setRatingFilter(4);
    }
  };
  const resetFilters = () => {
    setRatingFilter(0);
    setorderBy("name");
    setMaxInput(99999);
    setMinInput(1);
  };
  if (!isLoading && products.length === 0 && userInput != "" && trigger != "") {
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
        <Button
          color={Colors.primary}
          title={showFilters ? 'Hide Filters' : 'Filters'}
          onPress={() => {
            if (showFilters == false) {
              resetFilters();
            }
            setshowFilters(prevState => !prevState);
          }}
        />
        {showFilters && <View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <Dropdown
                // onChangeText={this.onChangeText}
                label='Rating'
                data={[{
                  value: "None",
                }, {
                  value: "1 and above",
                }, {
                  value: "2 and above",
                }, {
                  value: "3 and above",
                }, {
                  value: "4 and above",
                }, {
                  value: "5",
                }]}
                baseColor={Colors.primary}
                onChangeText={(value) => ratingHandler(value)}
                selectedItemColor={Colors.primary}
              />
            </View>

            <View style={{ width: 160, marginLeft: 8, marginRight: 20 }}>
              <Dropdown
                // onChangeText={this.onChangeText}
                dropdownMargins={{ min: 1, max: 20 }}
                dropdownOffset={{ top: 32, left: -30 }}
                label='Sort by'
                data={[{
                  value: 'A-Z Name',
                },
                {
                  value: 'Z-A Name',
                }, {
                  value: 'Ascending Price',
                }, {
                  value: 'Decreasing Price',
                }]}
                baseColor={Colors.primary}
                onChangeText={(value) => sortHandler(value)}
                selectedItemColor={Colors.primary}
              />
            </View>
          </View>
          <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row', marginBottom: 5 }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}>
              <Text style={{ paddingTop: 1, fontSize: 18, color: Colors.primary }}>Price Filter:</Text>
            </View>
            <Text style={{ paddingLeft: 12, paddingTop: 3, fontSize: 15, }}>Min: </Text>
            <FilterInput
              id="Mn"
              label="Min"
              autoCapitalize="none"
              onInputChange={minChangeHandler}

              initialValue=""
            />
            <Text style={{ paddingTop: 3, fontSize: 15 }}>Max: </Text>
            <FilterInput
              id="Max"
              label="Max"
              autoCapitalize="none"
              onInputChange={maxChangeHandler}

              initialValue=""
            />
          </View>
        </View>
        }
        <View style={styles.search}>
          <Text>No products found. Maybe try another search!</Text>
        </View>
      </View>
    );
  }


  return (
    <View style={{ paddingBottom: 100 }}>
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
      <Button
        color={Colors.primary}
        title={showFilters ? 'Hide Filters' : 'Filters'}
        onPress={() => {
          if (showFilters == false) {
            resetFilters();
          }
          setshowFilters(prevState => !prevState);
        }}
      />
      {showFilters && <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginLeft: 20 }}>
            <Dropdown
              // onChangeText={this.onChangeText}
              label='Rating'
              data={[{
                value: "None",
              }, {
                value: "1 and above",
              }, {
                value: "2 and above",
              }, {
                value: "3 and above",
              }, {
                value: "4 and above",
              }, {
                value: "5",
              }]}
              baseColor={Colors.primary}
              onChangeText={(value) => ratingHandler(value)}
              selectedItemColor={Colors.primary}
            />
          </View>

          <View style={{ width: 160, marginLeft: 8, marginRight: 20 }}>
            <Dropdown
              // onChangeText={this.onChangeText}
              dropdownMargins={{ min: 1, max: 20 }}
              dropdownOffset={{ top: 32, left: -30 }}
              label='Sort by'
              data={[{
                value: 'A-Z Name',
              },
              {
                value: 'Z-A Name',
              }, {
                value: 'Ascending Price',
              }, {
                value: 'Decreasing Price',
              }]}
              baseColor={Colors.primary}
              onChangeText={(value) => sortHandler(value)}
              selectedItemColor={Colors.primary}
            />
          </View>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row', marginBottom: 5 }}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}>
            <Text style={{ paddingTop: 1, fontSize: 18, color: Colors.primary }}>Price Filter:</Text>
          </View>
          <Text style={{ paddingLeft: 12, paddingTop: 3, fontSize: 15, }}>Min: </Text>
          <FilterInput
            id="Mn"
            label="Min"
            autoCapitalize="none"
            onInputChange={minChangeHandler}

            initialValue=""
          />
          <Text style={{ paddingTop: 3, fontSize: 15 }}>Max: </Text>
          <FilterInput
            id="Max"
            label="Max"
            autoCapitalize="none"
            onInputChange={maxChangeHandler}

            initialValue=""
          />
        </View>
      </View>
      }
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        contentContainerStyle={{ margin: 4 }}
        horizontal={false}
        numColumns={2}
        style={{ flexDirection: 'column' }}
        data={products}
        keyExtractor={item => item.pId}
        renderItem={itemData => (
          <ProductItem
            pID={itemData.item.pId}
            imgSrc={itemData.item.imgSrc}
            categoryName={itemData.item.categoryName}
            name={itemData.item.name}
            price={itemData.item.price}
            oldPrice={itemData.item.oldPrice}
            displayOldPrice={itemData.item.displayOldPrice}
            avgRating={itemData.item.avgRating}
            onSelect={() => {
              selectItemHandler(itemData.item.pId, itemData.item.name);
            }}

          >
          </ProductItem>
        )}
      />
    </View >
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
  filter: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center'

  },
  search: {
    flexDirection: 'row',
    justifyContent: "space-around",
    paddingRight: 15,
    paddingTop: 10,
    marginLeft: 10,
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
