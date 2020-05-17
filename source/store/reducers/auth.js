import { AUTHENTICATE, LOGOUT, USERNAME } from '../actions/auth';

const initialState = {
  token: null,
  username: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
      };
    case LOGOUT:
      return initialState;
    case USERNAME:
      return {
        username: action.username,
      };
    default:
      return state;
  }
};
