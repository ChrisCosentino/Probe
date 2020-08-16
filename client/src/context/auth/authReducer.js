import { SET_TOKEN } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      console.log(action.payload);
      return {
        ...state,
        token: action.payload,
        authenticated: true,
      };
    default:
      return state;
  }
};
