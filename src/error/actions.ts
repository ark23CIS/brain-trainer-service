import { v4 as uuidv4 } from 'uuid';
import { REMOVE_ERROR, ADD_ERROR, ADD_ERRORS, REMOVE_ERRORS } from './types';

type ErrorType = {
  msg: string,
  param: string
}

export const addError = (error: ErrorType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: ADD_ERROR,
    payload: { msg: error.msg, id, param: error.param },
  });
};

export const addErrorAndDelete = (error: ErrorType, timeout = 1000) => (dispatch) => {
  const id = uuidv4();
  dispatch({ type: ADD_ERRORS, payload: [{ msg: error.msg, id, param: error.param }] });
  setTimeout(() => {
    dispatch({ type: REMOVE_ERROR, payload: id });
  }, timeout);
};

export const addErrors = (errors: Array<ErrorType>) => (dispatch) => {
  const newErrors = errors.reduce((p, c) => {
    return [...p, { ...c, id: uuidv4() }];
  }, []);
  dispatch({ type: ADD_ERRORS, payload: newErrors });
};

export const clearError = () => (dispatch) => {
  dispatch({
    type: REMOVE_ERRORS,
  });
};