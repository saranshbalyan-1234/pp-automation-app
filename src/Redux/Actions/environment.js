import axios from "axios";
import {
  ENVIRONMENT_FAILURE,
  ENVIRONMENT_REQUEST,
  GET_ALL_ENVIRONMENT,
  ADD_ENVIRONMENT,
  ADD_COLUMN,
  UPDATE_COLUMN_VALUE,
  DELETE_COLUMN,
  DELETE_ENVIRONMENT,
} from "./action-types";
export const addEnvironment = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ENVIRONMENT_REQUEST });
      let { data } = await axios.post(`/environment`, payload);

      dispatch({
        type: ADD_ENVIRONMENT,
        payload: { envId: data.id, Environment: data.name },
      });
      return true;
    } catch (err) {
      dispatch({ type: ENVIRONMENT_FAILURE });
      return false;
    }
  };
};
export const deleteEnvironment = (envId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ENVIRONMENT_REQUEST });
      await axios.delete(`/environment/${envId}`);

      dispatch({
        type: DELETE_ENVIRONMENT,
        payload: envId,
      });
      return true;
    } catch (err) {
      dispatch({ type: ENVIRONMENT_FAILURE });
      return false;
    }
  };
};
export const addColumn = (payload) => {
  return async (dispatch, getState) => {
    try {
      let testCaseId = getState().testCase.currentTestCase?.id;
      dispatch({ type: ENVIRONMENT_REQUEST });
      await axios.post(`/environment/column/testCase/${testCaseId}`, payload);
      dispatch({ type: ADD_COLUMN, payload: payload.name });
      return true;
    } catch (err) {
      dispatch({ type: ENVIRONMENT_FAILURE });
      return false;
    }
  };
};
export const deleteColumn = (name) => {
  return async (dispatch, getState) => {
    try {
      let testCaseId = getState().testCase.currentTestCase?.id;
      dispatch({ type: ENVIRONMENT_REQUEST });
      await axios.delete(`/environment/column/${name}/testCase/${testCaseId}`);
      dispatch({ type: DELETE_COLUMN, payload: name });
      return true;
    } catch (err) {
      dispatch({ type: ENVIRONMENT_FAILURE });
      return false;
    }
  };
};
export const getAllEnvironments = (testCaseId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ENVIRONMENT_REQUEST });
      const { data } = await axios.get(`/environment/testCase/${testCaseId}`);
      dispatch({ type: GET_ALL_ENVIRONMENT, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: ENVIRONMENT_FAILURE });
      return false;
    }
  };
};
export const updateColumnValue = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ENVIRONMENT_REQUEST });
      await axios.put(`/environment/column/value`, payload);
      dispatch({ type: UPDATE_COLUMN_VALUE, payload });
      return true;
    } catch (err) {
      dispatch({ type: ENVIRONMENT_FAILURE });
      return false;
    }
  };
};
