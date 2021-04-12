import axios from 'axios';
import { History } from 'history';
import { addErrorAndDelete, addSuccessStatus } from './index';
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_CURRENT_PROFILE,
  PROFILE_ERROR,
  REMOVE_SUCCESSES
} from './types';

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profiles/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    if (err.statusText)
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText },
      });
  }
};

export const getProfileByID = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${user_id}`);
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    if (err.statusText)
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText },
      });
  }
};

export const deleteProfile = (history: History) => async (dispatch) => {
  try {
    await axios.delete('/api/profiles/me');
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: REMOVE_SUCCESSES });
    history.push('/');
    dispatch(addSuccessStatus({ msg: 'Your profile has been successfully deleted' }));
  } catch (err) {
    dispatch(addErrorAndDelete({ msg: 'Error with deleting profile' }));
  }
};