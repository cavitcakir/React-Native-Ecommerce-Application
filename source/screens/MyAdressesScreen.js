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
  Platform,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AdressesTile from '../components/AdressesGridTile';
import CommentInput from '../components/UI/CommentInput';


import Colors from '../constants/Colors';

const MyCommentsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [selectedProduct, setSelectedProduct] = useState({});

  const myToken = props.navigation.getParam('userToken');
  let dummy;
  const dispatch = useDispatch();

  const deneme = async () => {
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 5000,
      headers: {
        Authorization: myToken,
      },
    });
    await instance
      .get("seeMyAddress")
      .then((response) => {
        dummy = response.data;
      })
      .catch((error) => {
        setError(err.message);
        setError("wow");
      });
  }

  const removeAddress = async (address) => {
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 5000,
      headers: {
        Authorization: myToken,
      },
    });

    await instance
      .post("deleteAddress", { address: address })
      .then((response) => {
        loadItem();
      })
      .catch((error) => {
        setError(err.message);
        setError("wow");
      });
  }

  const selectItemHandler = (myToken) => {
    props.navigation.navigate('AddAddress', {
      myToken: myToken
    });
  };



  const renderGridItem = itemData => {
    return (
      <AdressesTile
        address={itemData.item.address}
        onRemove={() => {
          removeAddress(itemData.item.address);
        }}
      />
    );
  };

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

  if (!isLoading && selectedProduct == undefined) {
    return (
      <View style={styles.centered}>
        <Text>No comment found. Come later or add some :)</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        onRefresh={loadItem}
        refreshing={isRefreshing}
        keyExtractor={(item, index) => item.addressId.toString()}
        data={selectedProduct}
        renderItem={renderGridItem}
      />
      <TouchableOpacity onPress={() => { selectItemHandler(myToken) }} style={styles.button}>
        <Text style={styles.name}>
          Add Address
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

MyCommentsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Addresses',
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
  }
});

export default MyCommentsScreen;
