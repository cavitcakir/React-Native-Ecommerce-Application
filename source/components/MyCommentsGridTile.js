import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  Image
} from 'react-native';
import Colors from '../constants/Colors';
import { Rating } from 'react-native-elements';

import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

const CategoryGridTile = props => {
  let TouchableCmp = TouchableOpacity;
  return (
    <ListItem avatar>
      <Body>
        <TouchableCmp onPress={props.onSelect}>
          {props.waitingForApproval && <Text style={{ fontSize: 16, textDecorationLine: 'underline', fontWeight: 'bold', color: 'brown' }}>Waiting for approval.</Text>}
          {!props.waitingForApproval && props.Approved && <Text style={{ fontSize: 16, textDecorationLine: 'underline', fontWeight: 'bold', color: 'green' }}>Comment Approved </Text>}
          {!props.waitingForApproval && !props.Approved && <Text style={{ fontSize: 16, textDecorationLine: 'underline', fontWeight: 'bold', color: 'red' }}>Comment is not approved </Text>}
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.primary }}>{props.productName}</Text><Rating
            imageSize={25}
            type='custom'
            ratingColor={Colors.primary}
            ratingBackgroundColor='#c8c7c8'
            tintColor='#F2F2F2'
            readonly
            startingValue={props.commentRating}
            style={styles.rating}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{props.commentHeader}</Text>
          <Text>{props.commentbody}</Text>
        </TouchableCmp>
      </Body>
    </ListItem >

  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
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
    fontSize: 12,
    paddingLeft: 20
  }, rating: {
    alignItems: 'flex-start',
  },
});

export default CategoryGridTile;
