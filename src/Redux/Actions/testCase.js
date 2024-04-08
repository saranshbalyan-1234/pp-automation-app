import axios from "axios";
import {
  TEST_CASE_REQUEST,
  TEST_CASE_FAILURE,
  GET_ALL_TEST_CASE,
  CREATE_TEST_CASE,
  UPDATE_CURRENT_TEST_CASE,
  DELETE_TEST_CASE,
  GET_TEST_CASE_DETAILS_BY_ID,
  GET_TEST_CASE_STEPS_BY_ID,
  ADD_PROCESS,
  EDIT_PROCESS,
  DELETE_PROCESS,
  ADD_STEP,
  EDIT_STEP,
  DELETE_STEP,
  GET_TEST_CASE_LOGS,
  GET_ACTION_EVENTS,
} from "../Actions/action-types";
import { getDetailsEditedLogs } from "../../Utils/logs";
import { createReusableProcessLogs } from "./reusableProcess";
import { message } from "antd";

const uninterceptedAxiosInstance = axios.create()

export const getTestCaseByProject = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });

      const { data } = await axios.get(`/testcase`);
      dispatch({ type: GET_ALL_TEST_CASE, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const saveTestCase = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });
      const { data } = await axios.post(`/testcase`, payload);
      const updatedTestCase = {
        ...data,
        createdBy: getState().auth.user,
      };
      dispatch({ type: CREATE_TEST_CASE, payload: updatedTestCase });
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const editTestCase = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });

      let currentTestCaseId = getState().testCase.currentTestCase?.id;
      let editedTestCase = { ...payload };

      let oldData = getState().testCase.currentTestCase;

      const logs = await getDetailsEditedLogs(oldData, payload);
      logs.length > 0 && createTestCaseLogs(currentTestCaseId, logs);

      await axios.put(`/testcase/${currentTestCaseId}`, payload);
      dispatch({
        type: UPDATE_CURRENT_TEST_CASE,
        payload: editedTestCase,
      });

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const deleteTestCase = (testCaseId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });

      await axios.delete(`testCase/${testCaseId}`);
      dispatch({ type: DELETE_TEST_CASE, payload: testCaseId });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};
export const getTestCaseDetailsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });
      const { data } = await axios.get(`/testcase/${id}/details`);
      dispatch({ type: GET_TEST_CASE_DETAILS_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const getTestCaseStepsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });
      const { data } = await axios.get(`/testcase/${id}/testSteps`);
      dispatch({ type: GET_TEST_CASE_STEPS_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

//Process
export const addProcess = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });
      const { data } = await axios.post(`/testCase/process`, payload);
      dispatch({ type: ADD_PROCESS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const editProcess = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });

      const { data } = await axios.put(`/testCase/process/${payload.processId}`, payload.data);
      dispatch({
        type: EDIT_PROCESS,
        payload: data,
      });

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const deleteProcess = (
  processId,
  step,
  testCaseId,
  name,
  reusableProcess
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });

      await axios.delete(`/testCase/process/${processId}`);
      dispatch({
        type: DELETE_PROCESS,
        payload: { processId, step },
      });
      let msg = reusableProcess
        ? `removed the reusableProcess "${reusableProcess.name}" added as process "${name}"`
        : `deleted the process "${name}"`;
      createTestCaseLogs(testCaseId, [msg]);
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

//Step
export const addStep = (payload) => {
  return async (dispatch) => {
    try {
      let temp = { ...payload };
      temp.reusableId && delete temp.reusableId;
      dispatch({ type: TEST_CASE_REQUEST });
      const { data } = await axios.post(`/testStep`, temp);
      let newPayload = { ...data };

      if (payload.reusableId) newPayload.processId = payload.reusableId;

      dispatch({
        type: ADD_STEP,
        payload: newPayload,
      });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const editStep = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });
      const { data } = await axios.put(
        `/testStep/${payload.stepId}`,
        payload.data
      );

      dispatch({
        type: EDIT_STEP,
        payload: { ...data, processId: payload.processId },
      });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const deleteStep = (testStepId, step, process, reusableProcess) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });

      await axios.delete(`/testStep/${testStepId}`);
      dispatch({
        type: DELETE_STEP,
        payload: { testStepId, processId: process?.id, step },
      });

      let currentTestCaseId = getState().testCase.currentTestCase?.id;
      if (reusableProcess) {
        createTestCaseLogs(currentTestCaseId, [
          `deleted step from position ${step} from reusableProcess ${reusableProcess.name} or process "${process.name}`,
        ]);
      } else {
        createTestCaseLogs(currentTestCaseId, [
          `deleted step from position ${step} from process ${process.name}`,
        ]);
      }
      reusableProcess &&
        createReusableProcessLogs(reusableProcess?.id, [
          `deleted step from position ${step}`,
        ]);
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};
export const executeTestCase = (url, payload) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: TEST_CASE_REQUEST });
      await uninterceptedAxiosInstance.post(`${url}/execute`, payload, {
        headers: {
          Authorization: "Bearer " + getState().auth.user?.accessToken,
        }
      });
      message.info("Starting Execution")
      return true;
    } catch (err) {
      console.error(err)
      message.error("Failed To Execute")
      // message.error("Please Start Cloud Application");
      // dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const getTestCaseLogsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });
      const { data } = await axios.get(`/testCase/${id}/logs`);
      dispatch({ type: GET_TEST_CASE_LOGS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const getActionEvents = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });

      const { data } = await axios.get(`/global/actionEvent`);
      dispatch({ type: GET_ACTION_EVENTS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};


export const convertProcessToReusable = (processId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });

      const { data } = await axios.put(`/reusableProcess/convert/process/${processId}`);
      dispatch({
        type: EDIT_PROCESS,
        payload: data,
      });

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

//utils
export const createTestCaseLogs = async (id, logs) => {
  try {
    await axios.post(`/testCase/${id}/logs`, { logs });
    return true;
  } catch (err) {
    return false;
  }
};
