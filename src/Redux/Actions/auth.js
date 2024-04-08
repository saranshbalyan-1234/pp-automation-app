import axios from "axios";
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  EMPTY_USER,
  EMPTY_ENVIRONMENT,
  EMPTY_EXECUTION_HISTORY,
  EMPTY_OBJECT_BANK,
  EMPTY_PROJECT,
  EMPTY_REUSABLE_PROCESS,
  EMPTY_TEAM,
  EMPTY_ROLE,
  EMPTY_TEST_CASE,
  EMPTY_EXECUTION_SUITE,
} from "./action-types";

import { message } from "antd";

export const signIn = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGNIN_REQUEST });
      const { data } = await axios.post(`/auth/login`, payload);
      message.success("Logged In Successfully");
      dispatch({ type: SIGNIN_SUCCESS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: SIGNIN_FAILURE });
      return false;
    }
  };
};

export const register = (payload) => {
  return async (dispatch) => {
    try {
      await axios.post(`/auth/register`, payload);
      return true;
    } catch (err) {
      return false;
    }
  };
};

export const sendResetPasswordMail = (payload) => {
  return async (dispatch) => {
    try {
      await axios.post(`/auth/reset-password/send-mail`, payload);
      message.info("Please check email to reset your password.");
      return true;
    } catch (err) {
      return false;
    }
  };
};

export const resetPassword = async (token, password) => {
  try {
    await axios.post(`/auth/reset-password/${token}`, {
      password,
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: EMPTY_USER });
    dispatch({ type: EMPTY_ENVIRONMENT });
    dispatch({ type: EMPTY_EXECUTION_HISTORY });
    dispatch({ type: EMPTY_OBJECT_BANK });
    dispatch({ type: EMPTY_PROJECT });
    dispatch({ type: EMPTY_REUSABLE_PROCESS });
    dispatch({ type: EMPTY_TEAM });
    dispatch({ type: EMPTY_ROLE });
    dispatch({ type: EMPTY_TEST_CASE });
    dispatch({ type: EMPTY_EXECUTION_SUITE });
  };
};
