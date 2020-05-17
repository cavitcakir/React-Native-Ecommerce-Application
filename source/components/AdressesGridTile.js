import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  Image,
  Button
} from 'react-native';
import Colors from '../constants/Colors';

import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

const AddressGridTile = props => {
  return (
    <ListItem avatar>
      <Left>
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
      </Left>
      <Body>
        <Text style={{ marginTop: 5, fontSize: 18, fontWeight: 'bold', color: Colors.primary }}>{props.address}</Text>
      </Body>
    </ListItem >
  );

};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 5,
    height: 70,
    borderRadius: 10,
    marginBottom: 5
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
    padding: 10,
    justifyContent: 'flex-start'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    paddingLeft: 10
  },
  deleteButton: {
    marginLeft: 10,
  }
});

export default AddressGridTile;
