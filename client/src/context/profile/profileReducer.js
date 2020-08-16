import { GET_PROFILE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        anonymous: false,
        profile: action.payload,
      };
    default:
      return state;
  }
};
