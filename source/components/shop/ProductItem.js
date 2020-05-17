import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  Platform
} from 'react-native';
import Colors from '../../constants/Colors';

import { Rating } from 'react-native-elements';

const ProductItem = props => {
  return (
    <TouchableOpacity
      onPress={props.onSelect}
      activeOpacity={0.7}
      style={[
        styles.container,
        styles['product'],
      ]}
    >
      <Image
        style={styles.image}
        source={{ uri: props.imgSrc }}
      />

      <View style={styles.details}>
        <Rating
          imageSize={25}
          type='custom'
          ratingColor={Colors.primary}
          ratingBackgroundColor='#c8c7c8'
          readonly
          startingValue={props.avgRating}
          style={styles.rating}
        />
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.brand}>{props.csategoryName}</Text>
        {props.displayOldPrice && <Text style={styles.oldPrice}>{props.oldPrice.toFixed(2)} TL</Text>}
        <Text style={styles.price}>{props.price.toFixed(2)} TL</Text>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2.2,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },

  'product': {
    margin: 5,
  },

  image: {
    height: 180,
    marginBottom: 10,
  },

  title: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },

  rating: {
    alignItems: 'flex-start',
  },

  brand: {
    color: '#BE5200',
    fontSize: 12,
    marginBottom: 5,
    marginTop: 1,
  },
  oldPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#014E0A',
  },
});

export default ProductItem;
