import axios from "axios";
import {
  EXECUTION_HISTORY_REQUEST,
  EXECUTION_HISTORY_FAILURE,
  GET_ALL_EXECUTION_HISTORY,
  DELETE_EXECUTION_HISTORY,
  GET_EXECUTION_HISTORY_BY_ID,
  DELETE_ALL_EXECUTION_HISTORY,
} from "./action-types";

export const getAllExecutionHistoryByTestCase = (testcaseId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EXECUTION_HISTORY_REQUEST });
      const { data } = await axios.get(
        `/executionHistory/testCase/${testcaseId}`
      );
      dispatch({ type: GET_ALL_EXECUTION_HISTORY, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: EXECUTION_HISTORY_FAILURE });
      return false;
    }
  };
};

export const deleteExecutionHistory = (executionHistoryId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EXECUTION_HISTORY_REQUEST });
      await axios.delete(`/executionHistory/${executionHistoryId}`);
      dispatch({ type: DELETE_EXECUTION_HISTORY, payload: executionHistoryId });
      return true;
    } catch (err) {
      dispatch({ type: EXECUTION_HISTORY_FAILURE });
      return false;
    }
  };
};
export const deleteAllExecutionHistory = () => {
  return async (dispatch, getState) => {
    try {
      let testCaseId = getState().testCase.currentTestCase?.id;
      dispatch({ type: EXECUTION_HISTORY_REQUEST });
      await axios.delete(`/executionHistory/testCase/${testCaseId}`);
      dispatch({ type: DELETE_ALL_EXECUTION_HISTORY });
      return true;
    } catch (err) {
      dispatch({ type: EXECUTION_HISTORY_FAILURE });
      return false;
    }
  };
};

export const getExecutionHistoryById = (executionHistoryId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EXECUTION_HISTORY_REQUEST });
      const { data } = await axios.get(
        `/executionHistory/${executionHistoryId}`
      );
      dispatch({
        type: GET_EXECUTION_HISTORY_BY_ID,
        payload: data,
      });
      return true;
    } catch (err) {
      dispatch({ type: EXECUTION_HISTORY_FAILURE });
      return false;
    }
  };
};
