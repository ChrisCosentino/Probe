import { SET_TOKEN, SET_USER_ID } from '../types';

export default (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload._id,
      };

    case SET_TOKEN:
      console.log(action.payload);
      // localStorage.setItem('authToken', action.payload);
      return {
        ...state,
        token: action.payload,
        authenticated: true,
      };
    default:
      return state;
  }
};
