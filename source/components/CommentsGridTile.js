import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  Image
} from 'react-native';
import { Rating } from 'react-native-elements';

import Colors from '../constants/Colors';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
const CategoryGridTile = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <ListItem avatar>
      {props.isOwner && <Left>
        <TouchableOpacity
          onPress={props.onRemove}
          style={styles.deleteButton}
        >
          <Ionicons
            name={'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </Left>}
      <Body>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}>{props.commentHeader}</Text>
        <Text>{props.commentbody}</Text>
      </Body>
      <Right>
        <Rating
          imageSize={25}
          type='custom'
          ratingColor={Colors.primary}
          ratingBackgroundColor='#c8c7c8'
          tintColor='#F2F2F2'
          readonly
          startingValue={props.commentRating}
        />
        <Text note style={{ fontSize: 15 }}>-{props.commentOwner}</Text>
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    alignItems: 'flex-start',
    height: 70,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 80
  },
  image: {
    width: 30,
    height: 30,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: 'flex-start'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 20
  }
});

export default CategoryGridTile;
