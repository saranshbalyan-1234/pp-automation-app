import { message } from "antd";
import axios from "axios";
import {
  PROJECT_REQUEST,
  PROJECT_FAILURE,
  GET_ALL_PROJECT_SUCCESS,
  ADD_PROJECT_SUCCESS,
  GET_SELECTED_PROJECT,
  REMOVE_CURRENT_PROJECT_MEMBER,
  DELETE_PROJECT,
  ADD_CURRENT_PROJECT_MEMBER,
  EDIT_PROJECT_DETAILS,
} from "./action-types";

export const getAllProject = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROJECT_REQUEST });
      const { data } = await axios.get(`/project`, payload);
      dispatch({ type: GET_ALL_PROJECT_SUCCESS, payload: data });
      return data;
    } catch (err) {
      dispatch({ type: PROJECT_FAILURE });
      return false;
    }
  };
};
export const addProject = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROJECT_REQUEST });
      const { data } = await axios.post(`/project`, payload);
      let user = getState().auth.user;
      let newProject = { ...data, createdBy: user, members: [user] };
      dispatch({ type: ADD_PROJECT_SUCCESS, payload: newProject });
      return true;
    } catch (err) {
      dispatch({ type: PROJECT_FAILURE });
      return false;
    }
  };
};

export const getProjectById = (projectId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROJECT_REQUEST });
      const { data } = await axios.get(`/project/${projectId}`);
      dispatch({ type: GET_SELECTED_PROJECT, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: PROJECT_FAILURE });
      return false;
    }
  };
};

export const addMember = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROJECT_REQUEST });
      await axios.post(`/project/addMember`, {
        userId: payload.id,
        projectId: payload.projectId,
      });
      dispatch({ type: ADD_CURRENT_PROJECT_MEMBER, payload });
      return true;
    } catch (err) {
      dispatch({ type: PROJECT_FAILURE });
      return false;
    }
  };
};

export const removeMember = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROJECT_REQUEST });
      await axios.post(`/project/removeMember`, payload);
      dispatch({ type: REMOVE_CURRENT_PROJECT_MEMBER, payload });
      return true;
    } catch (err) {
      dispatch({ type: PROJECT_FAILURE });
      return false;
    }
  };
};
export const deleteProject = (projectId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROJECT_REQUEST });
      let currentProjectId = getState().projects.currentProject?.id;
      if (currentProjectId === projectId)
        throw message.error("Cannot delete selected project!");
      await axios.delete(`/project/${projectId}`);
      dispatch({ type: DELETE_PROJECT, payload: projectId });
      return true;
    } catch (err) {
      dispatch({ type: PROJECT_FAILURE });
      return false;
    }
  };
};

export const editProject = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROJECT_REQUEST });

      let currentProjectId = getState().projects.currentProject?.id;
      await axios.put(`/project`, payload);
      let editedProject = { ...payload };
      dispatch({
        type: EDIT_PROJECT_DETAILS,
        payload: { data: editedProject, projectId: currentProjectId },
      });
      return true;
    } catch (err) {
      dispatch({ type: PROJECT_FAILURE });
      return false;
    }
  };
};

export const getProjectkey = () => {
  return (dispatch, getState) => {
    try {
      let currentProjectName = getState().projects.currentProject?.name;
      let currentProjectId = getState().projects.currentProject?.id;
      if (currentProjectName) {
        let currentProjectArr = currentProjectName.split(" ");

        if (currentProjectArr.length > 2) {
          return (
            currentProjectArr[0] +
            currentProjectArr[2] +
            currentProjectArr[3] +
            currentProjectId
          );
        } else {
          return currentProjectName.substring(0, 3) + currentProjectId;
        }
      }
      return true;
    } catch (err) {
      return false;
    }
  };
};
