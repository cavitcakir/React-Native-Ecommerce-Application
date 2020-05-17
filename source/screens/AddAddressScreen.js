import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Platform,
  AsyncStorage
} from 'react-native';
import CommentInput from '../components/UI/CommentInput';


import Colors from '../constants/Colors';

const AddCommentScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [newAddress, setNewAddress] = useState("");
  const [rating, setrating] = useState("");

  const myToken = props.navigation.getParam('myToken');
  let dummy;

  const addressChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    setNewAddress(inputValue);
  };
  const sendRating = async () => {
    let myToken = await AsyncStorage.getItem('userData');
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 5000,
      headers: {
        Authorization: myToken,
      },
    });

    await instance
      .post("addAddress", {
        "address": newAddress,
      })
      .then((response) => {
        props.navigation.goBack(null);
      })
      .catch((error) => {
        setError(err.message);
        console.log(error);
      });
  }

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

  return (
    <ScrollView>
      <CommentInput
        id="Address"
        label=""
        autoCapitalize="none"
        onInputChange={addressChangeHandler}
        placeholder={"Address"}
        initialValue=""
      />


      <TouchableOpacity onPress={sendRating} style={styles.button}>
        <Text style={styles.name}>
          Add Address
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

AddCommentScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Add Address',
    headerTintColor: Colors.primary,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
    paddingBottom: 5
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'open-sans-bold',

  },

  button: {
    height: 50,
    width: 200,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    borderColor: '#ff6f00',
    borderWidth: 1,
    borderRadius: 15,
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  name: {
    fontFamily: 'open-sans',
    fontSize: 17,
    textAlign: 'center',
    marginHorizontal: 20
  },
  search: {
    flexDirection: 'row',
    justifyContent: "space-around",
    paddingRight: 15,
    paddingTop: 10
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AddCommentScreen;
