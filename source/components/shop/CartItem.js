import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

const CartItem = props => {

  let TouchableCmp = TouchableOpacity;
  return (
    <ListItem avatar>
      <Left>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.increment}
            style={{ paddingTop: 3, paddingRight: 1 }}
          >
            <Ionicons
              name="md-add"
              size={28}
              color="green"
            />
          </TouchableOpacity>
        )}
        <Text style={styles.quantity}>{props.quantity} </Text>

        {props.deletable && (
          <TouchableOpacity
            onPress={props.decrement}
            style={{ paddingTop: 3, paddingLeft: 1 }}
          >
            <Ionicons
              name="md-remove"
              size={28}
              color="red"
            />
          </TouchableOpacity>)}
      </Left>
      <Body>
        <TouchableCmp onPress={props.onSelect}>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{props.title}</Text>
          <Text style={{ fontSize: 15 }}>{props.amount} TL</Text>
        </TouchableCmp>
      </Body>
      <Right style={{ flexDirection: 'row' }}>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={{ paddingBottom: 4 }}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={28}
              color="red"
            />
          </TouchableOpacity>
        )}
        {!props.deletable && props.delivery && (
          <View>
            <Image
              style={styles.image2}
              source={require('../../assets/shipped.png')}
            />
          </View>
        )}
        {!props.deletable && !props.delivery && (
          <View>
            <Image
              style={styles.image}
              source={require('../../assets/dino.png')}
            />
          </View>
        )}
      </Right>
    </ListItem >

  );

  // return (
  //   <View style={styles.cartItem}>

  //     <View style={styles.itemData}>
  //       <Text style={styles.quantity}>{props.quantity} </Text>
  //       <Text style={styles.mainText}>{props.title}</Text>
  //     </View>
  //     <View style={styles.itemData}>
  //       <Text style={styles.mainText}>${props.amount}</Text>

  //       {props.deletable && (
  //         <TouchableOpacity
  //           onPress={props.increment}
  //           style={styles.deleteButton}
  //         >
  //           <Ionicons
  //             name="md-add"
  //             size={27}
  //             color="green"
  //           />
  //         </TouchableOpacity>
  //       )}
  //       {props.deletable && (
  //         <TouchableOpacity
  //           onPress={props.decrement}
  //           style={styles.deleteButton}
  //         >
  //           <Ionicons
  //             name="md-remove"
  //             size={23}
  //             color="red"
  //           />
  //         </TouchableOpacity>)}
  //       {props.deletable && (
  //         <TouchableOpacity
  //           onPress={props.onRemove}
  //           style={styles.deleteButton}
  //         >
  //           <Ionicons
  //             name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
  //             size={23}
  //             color="red"
  //           />
  //         </TouchableOpacity>
  //       )}
  //       {!props.deletable && props.delivery && (
  //         <View style={styles.deleteButton}
  //         >
  //           <Image
  //             style={styles.image2}
  //             source={require('../../assets/shipped.png')}
  //           />
  //         </View>
  //       )}
  //       {!props.deletable && !props.delivery && (
  //         <View style={styles.deleteButton}
  //         >
  //           <Image
  //             style={styles.image}
  //             source={require('../../assets/dino.png')}
  //           />
  //         </View>
  //       )}
  //     </View>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  cartItem: {
    paddingTop: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    height: 100,
  },
  image: {
    height: 45,
    width: 45,
  },
  image2: {
    height: 50,
    width: 50,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 8
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 20,
    paddingLeft: 5
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 13,
    margin: 15,
  },
  deleteButton: {
    marginLeft: 10,
    flex: 1
  }
});

export default CartItem;
