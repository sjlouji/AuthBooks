import {
    USER_LIST_LOADING,
    USER_LIST_LOADED,
    USER_LIST_LOAD_ERROR
  } from '../Action/types';
  
  const initialState = {
    isUserLoading: false,
    user: null,
  };

  export default function (state = initialState ,action) {
    switch (action.type) {
      case USER_LIST_LOADED:
        return {
          ...state,
          isUserLoading: false,
          user: action.payload.users,
        };
      case USER_LIST_LOADING:
        return {
          ...state,
          user: null,
          isUserLoading: true,
        };
    case USER_LIST_LOAD_ERROR:
        return {
            ...state,
            error: action.payload,
            isUserLoading: false
        }
      default:
        return state;
    }
  }