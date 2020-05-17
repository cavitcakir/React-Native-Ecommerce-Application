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
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CommentsGridTile from '../components/CommentsGridTile';
import CommentInput from '../components/UI/CommentInput';
import { Container, Content, List } from 'native-base';



import Colors from '../constants/Colors';

const CommentsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [username, setUsername] = useState("");

  const productId = props.navigation.getParam('id');
  let dummy;
  let userDummy;
  const dispatch = useDispatch();

  const deneme = async () => {
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 1000,
    });

    await instance
      .post("seeRating", { "pId": productId })
      .then((response) => {
        dummy = response.data;
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  const deneme2 = async () => {
    let myToken = await AsyncStorage.getItem('userData');
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
        userDummy = response.data.username;
      })
      .catch((error) => {
        setError(err.message);
        setError("wow");
      });
  }


  const removeComment = async (rId) => {
    let myToken = await AsyncStorage.getItem('userData');
    var instance = axios.create({
      baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/' : 'http://localhost:8000/api/',
      timeout: 5000,
      headers: {
        Authorization: myToken,
      },
    });

    instance
      .post("deleteRating", { "rId": rId })
      .then((response) => {
      })
      .catch((error) => {
        setError(err.message);
        setError("wow");
      });
  }

  const selectItemHandler = (id) => {
    props.navigation.navigate('AddComment', {
      id: id
    });
  };



  const renderGridItem = itemData => {
    if (itemData.item.commentOwner == username) {
      return (
        <Content>
          <List>
            <CommentsGridTile
              isOwner={true}
              commentbody={itemData.item.commentbody}
              commentOwner={itemData.item.commentOwner}
              commentRating={itemData.item.rating}
              commentHeader={itemData.item.commentHeader}
              onRemove={() => {
                removeComment(itemData.item.rId);
                props.navigation.goBack(null);
              }}
            />
          </List>
        </Content>
      );
    }
    else {
      return (
        < Content >
          <List>
            <CommentsGridTile
              isOwner={false}
              commentbody={itemData.item.commentbody}
              commentOwner={itemData.item.commentOwner}
              commentRating={itemData.item.rating}
              commentHeader={itemData.item.commentHeader}
            />

          </List>
        </Content >
      );
    }
  };

  const loadItem = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await deneme2();
      await deneme();
      setSelectedProduct(dummy);
      setUsername(userDummy);

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

  if (!isLoading && selectedProduct[0] == undefined) {
    return (
      <View style={styles.centered}>
        <Text>No comment found. Come later or add some :)</Text>
        <Button
          title="Add Comment"
          onPress={() => { { selectItemHandler(productId) } }}
          color={Colors.primary}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        onRefresh={loadItem}
        refreshing={isRefreshing}
        keyExtractor={(item, index) => item.rId.toString()}
        data={selectedProduct}
        renderItem={renderGridItem}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonCart}
        onPress={() => { selectItemHandler(productId) }}
      >
        <Text style={styles.buttonTitle}>Add Comment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

CommentsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Comments',
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
  }, buttonCart: {
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

export default CommentsScreen;
