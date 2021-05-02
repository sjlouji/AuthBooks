import axios from 'axios';
import {
  USER_LIST_LOADED,
  USER_LIST_LOADING,
  USER_LIST_LOAD_ERROR
} from './types';


const api = axios.create({
  baseURL: `http://localhost:8000`
})

export const loadUserList = () => (dispatch, getState) => {
  dispatch({ type: USER_LIST_LOADING });
  api
    .get(`/admin/users/list`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LIST_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
        dispatch({
            type: USER_LIST_LOAD_ERROR,
            payload: err
          })
    });
};


// Setup config with token - helper function
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};