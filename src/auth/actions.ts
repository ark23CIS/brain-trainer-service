import axios from 'axios';
import { History } from 'history';
import { setAuthToken, configContentType } from '../helpers';
import { addErrors } from './error';
import {
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  CONFIRMATION,
} from './types';

type UserCredentialsType = {
  email: string,
  password: string
}

type registerDataType = {
  firstName: string,
  lastName: string,
  history: History
} & UserCredentialsType

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(addErrors(errors));
    }
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({ firstName, lastName, email, password, history }: registerDataType) => async (dispatch) => {
  const body = JSON.stringify({ email, firstName, lastName, password });
  try {
    await axios.post('/api/users', body, configContentType());
    history.push('/profiles/me');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(addErrors(errors));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const confirm = (hash: string) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/confirm?hash=${hash}`);
    dispatch({ type: CONFIRMATION, payload: res.data.confirmed ? 'success' : 'error' });
  } catch (err) {
    dispatch({ type: CONFIRMATION, payload: 'error' });
  }
};

export const login = ({ email, password }: UserCredentialsType) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, configContentType());
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(addErrors(errors));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({ type: LOGOUT });
  localStorage.clear();
};