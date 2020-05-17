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
import { Rating } from 'react-native-elements';



import Colors from '../constants/Colors';
import { TextInput } from 'react-native-gesture-handler';

const AddCommentScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [commentHeader, setcommentHeader] = useState("");
  const [commentbody, setcommentbody] = useState("");
  const [rating, setrating] = useState("");

  const productId = props.navigation.getParam('id');
  let dummy;

  const ratingChangeHandler = (rating) => {
    setrating(rating);
  };
  const headerChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    setcommentHeader(inputValue);
  };
  const bodyChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    setcommentbody(inputValue);
  };
  const sendRating = async () => {
    let myToken = await AsyncStorage.getItem('userData');
    if (!myToken) {
      alert("Please sign in to comment on product");
    }
    else if (!commentHeader || !commentbody || !rating) {
      alert("Please fill the form to comment on product");
    }
    else {
      var instance = axios.create({
        baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
        timeout: 5000,
        headers: {
          Authorization: myToken,
        },
      });

      await instance
        .post("addRating", {
          "commentHeader": commentHeader,
          "commentbody": commentbody,
          "rating": rating,
          "pId": productId
        })
        .then((response) => {
          alert("Wait for appoval.");
          props.navigation.goBack(null);
        })
        .catch((error) => {
          setError(err.message);
          console.log(error);
        });
    }
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
        id="Header"
        label=""
        autoCapitalize="none"
        onInputChange={headerChangeHandler}
        placeholder={"Header"}
        initialValue=""
      />
      <CommentInput
        id="Body"
        label=""
        autoCapitalize="none"
        onInputChange={bodyChangeHandler}
        placeholder={"Body"}
        initialValue=""
      />

      <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10 }}>
        <Text style={styles.input}>Rating </Text>
        <Rating
          imageSize={25}
          type='custom'
          ratingColor={Colors.primary}
          ratingBackgroundColor='#c8c7c8'
          tintColor='#F2F2F2'
          style={styles.rating}
          onFinishRating={ratingChangeHandler}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonCart}
        onPress={sendRating}
      >
        <Text style={styles.buttonTitle}>Send Comment</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

AddCommentScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Add Comment',
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
  input: {
    fontSize: 21,
    fontFamily: 'open-sans',
    color: 'grey',
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

  buttonTitle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '800',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rating: {
    alignItems: 'flex-start',
  },

  buttonCart: {
    alignSelf: 'stretch',
    backgroundColor: Colors.primary,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20
  },

});

export default AddCommentScreen;
