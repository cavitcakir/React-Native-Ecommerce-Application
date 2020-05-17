import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Button
} from 'react-native';

import CategoryGridTile from '../components/CategoryGridTile';
import * as categoriesActions from '../store/actions/categories';
import Colors from '../constants/Colors';





const CategoriesScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const categories = useSelector(state => state.categories.availableCategories);
  const dispatch = useDispatch();

  const loadCategories = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(categoriesActions.fetchCategories());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadCategories
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadCategories]);

  useEffect(() => {
    setIsLoading(true);
    loadCategories().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadCategories]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadCategories}
          color={Colors.primary}
        />
      </View>
    );
  }

  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        name={itemData.item.name}
        icon={itemData.item.icon}
        onSelect={() => { props.navigation.navigate('SearchCategory', { searchString: itemData.item.name }); }}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && categories.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No categories found. Come later!</Text>
      </View>
    );
  }


  return (
    <FlatList
      onRefresh={loadCategories}
      refreshing={isRefreshing}
      keyExtractor={(item, index) => item.name}
      data={categories}
      renderItem={renderGridItem}
    />
  );
};

CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Categories',
    headerTintColor: Colors.primary,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoriesScreen;
