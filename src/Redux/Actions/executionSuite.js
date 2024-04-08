import axios from "axios";
import {
EXECUTION_SUITE_REQUEST,
EXECUTION_SUITE_FAILURE,
GET_ALL_EXECUTION_SUITE,
CREATE_EXECUTION_SUITE,
UPDATE_CURRENT_EXECUTION_SUITE,
DELETE_EXECUTION_SUITE,
GET_EXECUTION_SUITE_DETAILS_BY_ID,
GET_EXECUTION_SUITE_TEST_CASE_BY_ID,
ADD_EXECUTION_SUITE_TEST_CASE,
DELETE_EXECUTION_SUITE_TEST_CASE,
} from "./action-types";

export const getExecutionSuiteByProject = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EXECUTION_SUITE_REQUEST });
      const { data } = await axios.get(`/execution-suite`);
      dispatch({ type: GET_ALL_EXECUTION_SUITE, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: EXECUTION_SUITE_FAILURE });
      return false;
    }
  };
};

export const saveExecutionSuite= (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: EXECUTION_SUITE_REQUEST });
      const { data } = await axios.post(`/execution-suite`, payload);
      dispatch({
        type: CREATE_EXECUTION_SUITE,
        payload: data,
      });
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: EXECUTION_SUITE_FAILURE });
      return false;
    }
  };
};

export const editExecutionSuite= (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: EXECUTION_SUITE_REQUEST });

      let currentExecutionSuiteId =
        getState().executionSuite.currentExecutionSuite?.id;
      let editedExecutionSuite = { ...payload };

      await axios.put(`/execution-suite/${currentExecutionSuiteId}`, payload);
      dispatch({
        type: UPDATE_CURRENT_EXECUTION_SUITE,
        payload: editedExecutionSuite,
      });

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: EXECUTION_SUITE_FAILURE });
      return false;
    }
  };
};

export const deleteExecutionSuite = (executionSuiteId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EXECUTION_SUITE_REQUEST });

      await axios.delete(`execution-suite/${executionSuiteId}`);
      dispatch({ type: DELETE_EXECUTION_SUITE, payload: executionSuiteId });
      return true;
    } catch (err) {
      dispatch({ type: EXECUTION_SUITE_FAILURE });
      return false;
    }
  };
};
export const getExecutionSuiteDetailsById = (executionSuiteId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EXECUTION_SUITE_REQUEST });
      const { data } = await axios.get(
        `/execution-suite/${executionSuiteId}/details`
      );
      dispatch({ type: GET_EXECUTION_SUITE_DETAILS_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: EXECUTION_SUITE_FAILURE });
      return false;
    }
  };
};

export const getExecutionSuiteTestCaseById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EXECUTION_SUITE_REQUEST });
      const { data } = await axios.get(`/execution-suite/${id}/test-case`);
      dispatch({ type: GET_EXECUTION_SUITE_TEST_CASE_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: EXECUTION_SUITE_FAILURE });
      return false;
    }
  };
};

//Test Case
export const addTestCaseToExecutionSuite = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EXECUTION_SUITE_REQUEST });
      const { data } = await axios.post(`/execution-suite/add-test-case`, payload);
      dispatch({ type: ADD_EXECUTION_SUITE_TEST_CASE, payload:data});
      return true;
    } catch (err) {
      console.log(err)
      dispatch({ type: EXECUTION_SUITE_FAILURE });
      return false;
    }
  };
};


export const removeTestCaseFromSuite = (id, step) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EXECUTION_SUITE_REQUEST });

      await axios.delete(`/execution-suite/remove-test-case/${id}`);
      dispatch({
        type: DELETE_EXECUTION_SUITE_TEST_CASE,
        payload: {id, step },
      });
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: EXECUTION_SUITE_FAILURE });
      return false;
    }
  };
};



