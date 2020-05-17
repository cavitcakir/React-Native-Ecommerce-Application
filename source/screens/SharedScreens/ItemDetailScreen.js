import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import { Rating } from 'react-native-elements';

import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [selectedProduct, setSelectedProduct] = useState({});

  const productId = props.navigation.getParam('id');
  let dummy;
  const dispatch = useDispatch();

  const deneme = async () => {
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 1000,
    });

    await instance
      .get("productDetail?pId=" + productId)
      .then((response) => {
        dummy = response.data[0];
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  const loadItem = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await deneme();
      setSelectedProduct(dummy);

    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);


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
    loadItem().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadItem]);


  const selectItemHandler = (id) => {
    props.navigation.navigate('Comments', {
      id: id
    });
  };

  if (error) {
    console.log(error);
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadItem}
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

  if (!isLoading && selectedProduct.price === undefined) {
    return (
      <View style={styles.centered}>
        <Text>No product found. Come later!</Text>
        <Button
          title="Try again"
          onPress={loadItem}
          color={Colors.primary}
        />
      </View>
    );
  }

  return (

    <View style={styles.container}>

      <ScrollView style={styles.productContainer}>
        <View style={styles.product}>
          <Image
            style={styles.image}
            source={{ uri: selectedProduct.imgSrc }}
          />

          <View style={styles.priceContainer}>
            <Rating
              imageSize={25}
              type='custom'
              ratingColor={Colors.primary}
              ratingBackgroundColor='#c8c7c8'
              readonly
              startingValue={selectedProduct.avgRating}
            />
            <Text style={styles.stock}>Stock: {selectedProduct.stock} </Text>
            <Text style={styles.price}>{selectedProduct.price.toFixed(2)} TL</Text>
          </View>
          <View style={styles.informationContainer}>
            <View style={styles.titleContainer}>

              <Text style={styles.title}>{selectedProduct.name}</Text>

              <Text style={styles.brand}>Listed Date: {selectedProduct.listedDate} </Text>
              <Text style={styles.brand}>Category: {selectedProduct.categoryName}</Text>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={styles.descHead}>Item Details: </Text>
                <Text style={styles.desc}>{selectedProduct.description}</Text>
              </View>
            </View>

          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonComment}
            onPress={() => { selectItemHandler(productId) }}
          >
            <Text style={styles.buttonTitle}>Comments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonCart}
            onPress={() => {
              dispatch(cartActions.addToCart(selectedProduct));
            }}
          >
            <Text style={styles.buttonTitle}>Add to cart</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </View>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: "Item Details",
    headerTintColor: Colors.primary,
  };
};

const styles = StyleSheet.create({
  productContainer: {
    margin: 10,
  },

  product: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },

  image: {
    height: 285,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  informationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    minWidth: 300
  },

  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginRight: 10,
  },

  priceContainer: {
    alignItems: 'flex-end',
    marginBottom: 5,
    marginRight: 15
  },


  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descHead: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },

  brand: {
    color: 'brown',
    fontSize: 13,
    paddingTop: 2
  },
  desc: {
    color: 'black',
    fontSize: 14,
    paddingTop: 1,
    marginRight: 40,
    paddingRight: 40
  },
  price: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stock: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 5
  },

  buttonCart: {
    alignSelf: 'stretch',
    backgroundColor: Colors.primary,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10
  },
  buttonComment: {
    alignSelf: 'stretch',
    backgroundColor: Colors.primary,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10
  },

  buttonTitle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: '800',
  },
});

export default ProductDetailScreen;
