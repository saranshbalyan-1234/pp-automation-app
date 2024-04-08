import axios from "axios";
import {
  GET_ALL_TEST_OBJECT,
  DELETE_TEST_OBJECT,
  OBJECT_BANK_REQUEST,
  OBJECT_BANK_FAILURE,
  GET_OBJECT_DETAILS_BY_ID,
  CREATE_TEST_OBJECT,
  UPDATE_TEST_OBJECT,
  ADD_OBJECT_LOCATOR,
  GET_OBJECT_LOCATORS,
  DELETE_OBJECT_LOCATOR,
  GET_OBJECT_LOGS,
} from "./action-types";
import { getDetailsEditedLogs } from "../../Utils/logs";
export const getObjectByProject = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });

      const { data } = await axios.get(`/object`);
      dispatch({ type: GET_ALL_TEST_OBJECT, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const saveObject = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.post(`/object`, payload);
      dispatch({ type: CREATE_TEST_OBJECT, payload: data });
      return data;
    } catch (err) {
      console.log(err);
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const editObject = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });

      let currentObjectId = getState().objectBank.currentObject?.id;
      let oldData = getState().objectBank.currentObject;

      const logs = await getDetailsEditedLogs(oldData, payload);
      logs.length > 0 && createObjectLogs(currentObjectId, logs);

      await axios.put(`/object/${currentObjectId}`, payload);
      dispatch({
        type: UPDATE_TEST_OBJECT,
        payload: payload,
      });

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const deleteObject = (objectId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });

      await axios.delete(`object/${objectId}`);
      dispatch({ type: DELETE_TEST_OBJECT, payload: objectId });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};
export const getObjectDetailsById = (objectId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.get(`/object/${objectId}/details`);
      dispatch({ type: GET_OBJECT_DETAILS_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const getObjectLogsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.get(`/object/${id}/logs`);
      dispatch({ type: GET_OBJECT_LOGS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

//locators

export const getObjectLocator = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.get(`/object/${id}/locator`);
      dispatch({ type: GET_OBJECT_LOCATORS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const addObjectLocator = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.post(`/object/locator`, payload);
      dispatch({ type: ADD_OBJECT_LOCATOR, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const deleteLocator = (locatorId, name, type) => {
  return async (dispatch, getState) => {
    try {
      let currentObjectId = getState().objectBank.currentObject?.id;

      dispatch({ type: OBJECT_BANK_REQUEST });

      await axios.delete(`/object/locator/${locatorId}`);
      dispatch({
        type: DELETE_OBJECT_LOCATOR,
        payload: locatorId,
      });

      createObjectLogs(currentObjectId, [
        `Deleted the "${type}" locator "${name}"`,
      ]);

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

//utils
export const createObjectLogs = async (id, logs) => {
  try {
    await axios.post(`/object/${id}/logs`, { logs });
    return true;
  } catch (err) {
    return false;
  }
};
