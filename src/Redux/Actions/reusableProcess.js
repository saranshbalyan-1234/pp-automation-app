import axios from "axios";
import {
  REUSABLE_PROCESS_REQUEST,
  REUSABLE_PROCESS_FAILURE,
  GET_ALL_REUSABLE_PROCESS,
  CREATE_REUSABLE_PROCESS,
  UPDATE_CURRENT_REUSABLE_PROCESS,
  DELETE_REUSABLE_PROCESS,
  GET_REUSABLE_PROCESS_DETAILS_BY_ID,
  GET_REUSABLE_PROCESS_STEPS_BY_ID,
  ADD_REUSABLE_STEP,
  EDIT_REUSABLE_STEP,
  DELETE_REUSABLE_STEP,
  GET_REUSABLE_PROCESS_LOGS,
} from "./action-types";

export const getReusableProcessByProject = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_PROCESS_REQUEST });
      const { data } = await axios.get(`/reusableProcess`);
      dispatch({ type: GET_ALL_REUSABLE_PROCESS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: REUSABLE_PROCESS_FAILURE });
      return false;
    }
  };
};

export const saveReusableProcess = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: REUSABLE_PROCESS_REQUEST });
      const { data } = await axios.post(`/reusableProcess`, payload);
      const updatedReusableProcess = {
        ...data,
        createdBy: getState().auth.user,
      };
      dispatch({
        type: CREATE_REUSABLE_PROCESS,
        payload: updatedReusableProcess,
      });
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: REUSABLE_PROCESS_FAILURE });
      return false;
    }
  };
};

export const editReusableProcess = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: REUSABLE_PROCESS_REQUEST });

      let currentReusableProcessId =
        getState().reusableProcess.currentReusableProcess?.id;
      let editedReusableProcess = { ...payload };

      await axios.put(`/reusableProcess/${currentReusableProcessId}`, payload);
      dispatch({
        type: UPDATE_CURRENT_REUSABLE_PROCESS,
        payload: editedReusableProcess,
      });

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: REUSABLE_PROCESS_FAILURE });
      return false;
    }
  };
};

export const deleteReusableProcess = (reusableProcessId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_PROCESS_REQUEST });

      await axios.delete(`reusableProcess/${reusableProcessId}`);
      dispatch({ type: DELETE_REUSABLE_PROCESS, payload: reusableProcessId });
      return true;
    } catch (err) {
      dispatch({ type: REUSABLE_PROCESS_FAILURE });
      return false;
    }
  };
};
export const getReusableProcessDetailsById = (reusableProcessId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_PROCESS_REQUEST });
      const { data } = await axios.get(
        `/reusableProcess/${reusableProcessId}/details`
      );
      dispatch({ type: GET_REUSABLE_PROCESS_DETAILS_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: REUSABLE_PROCESS_FAILURE });
      return false;
    }
  };
};

export const getReusableProcessStepsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_PROCESS_REQUEST });
      const { data } = await axios.get(`/reusableProcess/${id}/testSteps`);
      dispatch({ type: GET_REUSABLE_PROCESS_STEPS_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: REUSABLE_PROCESS_FAILURE });
      return false;
    }
  };
};

//Step
export const addReusableStep = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_PROCESS_REQUEST });
      const { data } = await axios.post(`/testStep`, payload);
      dispatch({ type: ADD_REUSABLE_STEP, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: REUSABLE_PROCESS_FAILURE });
      return false;
    }
  };
};

export const editReusableStep = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_PROCESS_REQUEST });
      const { data } = await axios.put(
        `/testStep/${payload.stepId}`,
        payload.data
      );
      dispatch({ type: EDIT_REUSABLE_STEP, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: REUSABLE_PROCESS_FAILURE });
      return false;
    }
  };
};

export const deleteStep = (testStepId, step) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: REUSABLE_PROCESS_REQUEST });

      await axios.delete(`/testStep/${testStepId}`);
      dispatch({
        type: DELETE_REUSABLE_STEP,
        payload: { testStepId, step },
      });
      let currentReusableProcessId =
        getState().reusableProcess.currentReusableProcess?.id;

      createReusableProcessLogs(currentReusableProcessId, [
        `deleted step from position ${step}`,
      ]);
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: REUSABLE_PROCESS_FAILURE });
      return false;
    }
  };
};

export const getReusableProcessLogsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_PROCESS_REQUEST });
      const { data } = await axios.get(`/reusableProcess/${id}/logs`);
      dispatch({ type: GET_REUSABLE_PROCESS_LOGS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: REUSABLE_PROCESS_FAILURE });
      return false;
    }
  };
};

//utils
export const createReusableProcessLogs = async (id, logs) => {
  try {
    await axios.post(`/reusableProcess/${id}/logs`, { logs });
    return true;
  } catch (err) {
    return false;
  }
};
