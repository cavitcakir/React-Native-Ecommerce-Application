"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleDrawer = exports.closeDrawer = exports.openDrawer = exports.MARK_DRAWER_IDLE = exports.MARK_DRAWER_SETTLING = exports.MARK_DRAWER_ACTIVE = exports.DRAWER_CLOSED = exports.DRAWER_OPENED = exports.TOGGLE_DRAWER = exports.CLOSE_DRAWER = exports.OPEN_DRAWER = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const OPEN_DRAWER = 'Navigation/OPEN_DRAWER';
exports.OPEN_DRAWER = OPEN_DRAWER;
const CLOSE_DRAWER = 'Navigation/CLOSE_DRAWER';
exports.CLOSE_DRAWER = CLOSE_DRAWER;
const TOGGLE_DRAWER = 'Navigation/TOGGLE_DRAWER';
exports.TOGGLE_DRAWER = TOGGLE_DRAWER;
const DRAWER_OPENED = 'Navigation/DRAWER_OPENED';
exports.DRAWER_OPENED = DRAWER_OPENED;
const DRAWER_CLOSED = 'Navigation/DRAWER_CLOSED';
exports.DRAWER_CLOSED = DRAWER_CLOSED;
const MARK_DRAWER_ACTIVE = 'Navigation/MARK_DRAWER_ACTIVE';
exports.MARK_DRAWER_ACTIVE = MARK_DRAWER_ACTIVE;
const MARK_DRAWER_SETTLING = 'Navigation/MARK_DRAWER_SETTLING';
exports.MARK_DRAWER_SETTLING = MARK_DRAWER_SETTLING;
const MARK_DRAWER_IDLE = 'Navigation/MARK_DRAWER_IDLE';
exports.MARK_DRAWER_IDLE = MARK_DRAWER_IDLE;

const openDrawer = payload => _objectSpread({
  type: OPEN_DRAWER
}, payload);

exports.openDrawer = openDrawer;

const closeDrawer = payload => _objectSpread({
  type: CLOSE_DRAWER
}, payload);

exports.closeDrawer = closeDrawer;

const toggleDrawer = payload => _objectSpread({
  type: TOGGLE_DRAWER
}, payload);

exports.toggleDrawer = toggleDrawer;
//# sourceMappingURL=DrawerActions.js.map