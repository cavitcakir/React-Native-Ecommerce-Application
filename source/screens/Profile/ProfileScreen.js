import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
  AsyncStorage
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';
import axios from 'axios';

const ProfileScreen = props => {
  const [getUsername, setUsername] = useState("");
  const [userToken, setUsertoken] = useState("");

  const dispatch = useDispatch();
  let TouchableCmp = TouchableOpacity;


  getTokenInfo = async () => {
    let myToken = await AsyncStorage.getItem('userData');
    setUsertoken(myToken);
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 5000,
      headers: {
        Authorization: myToken,
      },
    });
    instance
      .get("userDetail")
      .then((response) => {
        setUsername(response.data.username);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  const isAuth = useSelector(state => !!state.auth.token);

  if (isAuth) {
    getTokenInfo();
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image
            style={styles.image}
            source={require('../../assets/dino.png')}
          />
          <Text style={styles.description}>{getUsername}</Text>
        </View>

        <TouchableCmp onPress={() => props.navigation.navigate('Orders')} style={{
          borderBottomWidth: 1, borderBottomStartRadius: 20, marginRight: 220,
        }} >
          <Text style={styles.title}>
            My Orders
          </Text>
        </TouchableCmp>

        <TouchableCmp onPress={() => props.navigation.navigate('MyComments', { userToken: userToken })} style={{ borderBottomWidth: 1, borderBottomStartRadius: 20, marginRight: 180 }}  >
          <Text style={styles.title} >
            My Comments
          </Text>
        </TouchableCmp>

        <TouchableCmp onPress={() => props.navigation.navigate('MyAdresses', { userToken: userToken })} style={{ borderBottomWidth: 1, borderBottomStartRadius: 20, marginRight: 200 }}  >
          <Text style={styles.title} >
            My Adresses
          </Text>
        </TouchableCmp>

        <TouchableCmp onPress={() => props.navigation.navigate('changePassword', { userToken: userToken })} style={{ borderBottomWidth: 1, borderBottomStartRadius: 20, marginRight: 150 }}  >
          <Text style={styles.title} >
            Change Password
          </Text>
        </TouchableCmp>

        <TouchableCmp onPress={() => { dispatch(authActions.logout()) }} style={{ borderBottomWidth: 1, borderBottomStartRadius: 20, marginRight: 250 }}  >
          <Text style={styles.title}>
            Logout
          </Text>
        </TouchableCmp>

      </View>
    );
  }
  else {
    return (
      <View style={styles.container2}>
        <Text style={{ fontSize: 20, marginBottom: 20, marginLeft: 10, color: 'red', fontWeight: 'bold' }}>You are not logged in!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('Auth')}
        >
          <Text style={{ fontSize: 25 }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('SignUp')}
        >
          <Text style={{ fontSize: 25 }}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

ProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Profile',
    headerTintColor: Colors.primary,
  };
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: Colors.primary,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 70,
    borderRadius: 10,
    elevation: 5
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
  container2: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'left',
    paddingLeft: 15,
    paddingBottom: 3,
    paddingTop: 10,
    color: '#ff6f00',
  },
  profile: {
    paddingLeft: 15,
    paddingBottom: 20,
    flexDirection: 'row'
  }
});

export default ProfileScreen;

