function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export const OPEN_DRAWER = 'Navigation/OPEN_DRAWER';
export const CLOSE_DRAWER = 'Navigation/CLOSE_DRAWER';
export const TOGGLE_DRAWER = 'Navigation/TOGGLE_DRAWER';
export const DRAWER_OPENED = 'Navigation/DRAWER_OPENED';
export const DRAWER_CLOSED = 'Navigation/DRAWER_CLOSED';
export const MARK_DRAWER_ACTIVE = 'Navigation/MARK_DRAWER_ACTIVE';
export const MARK_DRAWER_SETTLING = 'Navigation/MARK_DRAWER_SETTLING';
export const MARK_DRAWER_IDLE = 'Navigation/MARK_DRAWER_IDLE';
export const openDrawer = payload => _objectSpread({
  type: OPEN_DRAWER
}, payload);
export const closeDrawer = payload => _objectSpread({
  type: CLOSE_DRAWER
}, payload);
export const toggleDrawer = payload => _objectSpread({
  type: TOGGLE_DRAWER
}, payload);
//# sourceMappingURL=DrawerActions.js.map