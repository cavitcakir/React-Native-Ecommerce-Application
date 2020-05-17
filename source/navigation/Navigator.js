import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import ItemDetailScreen from '../screens/SharedScreens/ItemDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchCategoryScreen from '../screens/SearchCategoryScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import StartupScreen from '../screens/StartupScreen';
import OrdersScreen from '../screens/Profile/OrdersScreen';
import CartScreen from '../screens/SharedScreens/CartScreen';
import CommentsScreen from '../screens/CommentsScreen';
import MyCommentsScreen from '../screens/MyCommentsScreen';
import MyAdressesScreen from '../screens/MyAdressesScreen';
import AddCommentScreen from '../screens/AddCommentScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import changePasswordScreen from '../screens/changePasswordScreen';

import Colors from '../constants/Colors';
import { Col } from 'native-base';



const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    ItemDetail: ItemDetailScreen,
    Cart: CartScreen,
    Comments: CommentsScreen,
    AddComment: AddCommentScreen
  },
  {
    headerTintColor: Colors.primary
  }
);

const SearchNavigator = createStackNavigator(
  {
    SearchS: SearchScreen,
    ItemDetail: ItemDetailScreen,
    Cart: CartScreen,
    Comments: CommentsScreen,
    AddComment: AddCommentScreen
  },
  {
    headerTintColor: Colors.primary
  }
);


const AuthNavigator = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen
  },
  {
    headerTintColor: Colors.primary,
    headerTitle: 'A Screen',
    headerTintColor: Colors.primary
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    Orders: OrdersScreen,
    MyComments: MyCommentsScreen,
    MyAdresses: MyAdressesScreen,
    AddAddress: AddAddressScreen,
    changePassword: changePasswordScreen
  },
  {
    headerTintColor: Colors.primary,
    headerTitle: 'A Screen',
    headerTintColor: Colors.primary
  }
);

const CategoriesNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    SearchCategory: SearchCategoryScreen,
    ItemDetail: ItemDetailScreen,
    Cart: CartScreen,
    Comments: CommentsScreen,
    AddComment: AddCommentScreen
  },
  {
    headerTintColor: Colors.primary,
    headerTitle: 'A Screen',
    headerTintColor: Colors.primary
  }
);

const tabScreenConfig = {
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primary,
      headerTintColor: Colors.primary
    }
  },
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-search" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primary,
      headerTintColor: Colors.primary
    }
  },
  Categories: {
    screen: CategoriesNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-bookmarks" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primary,
      headerTintColor: Colors.primary
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-person" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primary,
      headerTintColor: Colors.primary
    }
  }
};

const TabNavigator = createBottomTabNavigator(
  tabScreenConfig, {
  tabBarOptions: {
    activeTintColor: Colors.primary,
    headerTintColor: Colors.primary
  }
});

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: TabNavigator
},
  {
    headerTintColor: Colors.primary
  }
);



export default createAppContainer(MainNavigator);
