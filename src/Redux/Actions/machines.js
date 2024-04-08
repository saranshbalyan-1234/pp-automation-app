import axios from "axios";
import { message } from "antd";
import {
  MACHINES_REQUEST,
  MACHINES_FAILURE,
  GET_ALL_MACHINES,
  ADD_MACHINE,
  REMOVE_MACHINE,
  MACHINES_VERSION_CHECK
} from "./action-types";

const uninterceptedAxiosInstance = axios.create();

export const getAllMachines = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: MACHINES_REQUEST });
      const { data } = await axios.get(`/machines`);
      dispatch({ type: GET_ALL_MACHINES, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: MACHINES_FAILURE });
      return false;
    }
  };
};

export const removeMachine = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MACHINES_REQUEST });
      await axios.delete(`/machines/${id}`);
      dispatch({ type: REMOVE_MACHINE, payload: id });
      return true;
    } catch (err) {
      dispatch({ type: MACHINES_FAILURE });
      return false;
    }
  };
};

export const addMachine = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: MACHINES_REQUEST });

      return uninterceptedAxiosInstance
        .post(`${payload.url}/execute`, {}, {
          headers: {
            Authorization: "Bearer " + getState().auth.user?.accessToken,
          },
        })
        .catch(async (err) => {
          const error = err.response?.data?.error;
          if (error == "Invalid Test Case") {
            const { data } = await axios.post(`/machines`, payload);
            dispatch({ type: ADD_MACHINE, payload: data });
            return data;
          } else {
            dispatch({ type: MACHINES_FAILURE });
            message.error("Not A Verified Machine!")
            return false
          }
        });

    } catch (err) {
      dispatch({ type: MACHINES_FAILURE });
      return false;
    }
  };
};


export const checkChromedriverCompatibility = (machine) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MACHINES_REQUEST });
      const { data } = await axios.get(`${machine}/check-compatibility`);
      dispatch({ type: MACHINES_VERSION_CHECK });
      return data
    } catch (err) {
      dispatch({ type: MACHINES_FAILURE });
    }
  };
};
