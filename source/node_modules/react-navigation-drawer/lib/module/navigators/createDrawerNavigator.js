function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { Dimensions, Platform, ScrollView, I18nManager } from 'react-native';
import { createNavigator, ThemeColors, SafeAreaView } from 'react-navigation';
import DrawerRouter from '../routers/DrawerRouter';
import DrawerView from '../views/DrawerView';
import DrawerItems from '../views/DrawerNavigatorItems';

const defaultContentComponent = props => /*#__PURE__*/React.createElement(ScrollView, {
  alwaysBounceVertical: false
}, /*#__PURE__*/React.createElement(SafeAreaView, {
  forceInset: {
    top: 'always',
    horizontal: 'never'
  }
}, /*#__PURE__*/React.createElement(DrawerItems, props)));

const DefaultDrawerConfig = {
  drawerWidth: () => {
    /*
     * Default drawer width is screen width - header height
     * with a max width of 280 on mobile and 320 on tablet
     * https://material.io/guidelines/patterns/navigation-drawer.html
     */
    const {
      height,
      width
    } = Dimensions.get('window');
    const smallerAxisSize = Math.min(height, width);
    const isLandscape = width > height;
    const isTablet = smallerAxisSize >= 600;
    const appBarHeight = Platform.OS === 'ios' ? isLandscape ? 32 : 44 : 56;
    const maxWidth = isTablet ? 320 : 280;
    return Math.min(smallerAxisSize - appBarHeight, maxWidth);
  },
  contentComponent: defaultContentComponent,
  drawerPosition: I18nManager.isRTL ? 'right' : 'left',
  keyboardDismissMode: 'on-drag',
  drawerBackgroundColor: {
    light: ThemeColors.light.bodyContent,
    dark: ThemeColors.dark.bodyContent
  },
  overlayColor: {
    light: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.5)'
  },
  drawerType: 'front',
  hideStatusBar: false,
  statusBarAnimation: 'slide'
};

const DrawerNavigator = (routeConfigs, config = {}) => {
  const mergedConfig = _objectSpread({}, DefaultDrawerConfig, {}, config);

  const drawerRouter = DrawerRouter(routeConfigs, mergedConfig); // TODO: don't have time to fix it right now
  // @ts-ignore

  const navigator = createNavigator(DrawerView, drawerRouter, mergedConfig);
  return navigator;
};

export default DrawerNavigator;
//# sourceMappingURL=createDrawerNavigator.js.map