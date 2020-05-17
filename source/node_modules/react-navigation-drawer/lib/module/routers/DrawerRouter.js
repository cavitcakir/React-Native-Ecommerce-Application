function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { SwitchRouter, NavigationActions } from 'react-navigation';
import * as DrawerActions from './DrawerActions';

function withDefaultValue(obj, key, defaultValue) {
  // @ts-ignore
  if (obj.hasOwnProperty(key) && typeof obj[key] !== 'undefined') {
    return obj;
  } // @ts-ignore


  obj[key] = defaultValue;
  return obj;
}

const getActiveRouteKey = route => {
  if (route.routes && typeof route.index === 'number' && route.routes[route.index]) {
    return getActiveRouteKey(route.routes[route.index]);
  }

  return route.key;
};

export default ((routeConfigs, config = {}) => {
  config = _objectSpread({}, config);
  config = withDefaultValue(config, 'resetOnBlur', config.unmountInactiveRoutes ? true : !!config.resetOnBlur);
  config = withDefaultValue(config, 'backBehavior', 'initialRoute');
  const switchRouter = SwitchRouter(routeConfigs, config);
  return _objectSpread({}, switchRouter, {
    getActionCreators(route, navStateKey) {
      return _objectSpread({
        openDrawer: () => DrawerActions.openDrawer({
          key: navStateKey
        }),
        closeDrawer: () => DrawerActions.closeDrawer({
          key: navStateKey
        }),
        toggleDrawer: () => DrawerActions.toggleDrawer({
          key: navStateKey
        })
      }, switchRouter.getActionCreators(route, navStateKey));
    },

    getStateForAction(action, state) {
      // Set up the initial state if needed
      if (!state) {
        return _objectSpread({}, switchRouter.getStateForAction(action, undefined), {
          isDrawerOpen: false
        });
      }

      const isRouterTargeted = action.key == null || action.key === state.key;

      if (isRouterTargeted) {
        // Only handle actions that are meant for this drawer, as specified by action.key.
        if (action.type === DrawerActions.CLOSE_DRAWER || action.type === NavigationActions.BACK && state.isDrawerOpen) {
          return _objectSpread({}, state, {
            isDrawerOpen: false
          });
        }

        if (action.type === DrawerActions.OPEN_DRAWER) {
          return _objectSpread({}, state, {
            isDrawerOpen: true
          });
        }

        if (action.type === DrawerActions.TOGGLE_DRAWER) {
          return _objectSpread({}, state, {
            isDrawerOpen: !state.isDrawerOpen
          });
        }
      } // Fall back on switch router for screen switching logic, and handling of child routers


      const switchedState = switchRouter.getStateForAction(action, state);

      if (switchedState === null) {
        // The switch router or a child router is attempting to swallow this action. We return null to allow this.
        return null;
      } // Has the switch router changed the state?


      if (switchedState !== state) {
        // If any navigation has happened, and the drawer is maybe open, make sure to close it
        if (getActiveRouteKey(switchedState) !== getActiveRouteKey(state) && state.isDrawerOpen) {
          return _objectSpread({}, switchedState, {
            isDrawerOpen: false
          });
        } // At this point, return the state as defined by the switch router.
        // The active route key hasn't changed, so this most likely means that a child router has returned
        // a new state like a param change, but the same key is still active and the drawer will remain open


        return switchedState;
      }

      return state;
    }

  });
});
//# sourceMappingURL=DrawerRouter.js.map