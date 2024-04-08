import {
  EXECUTION_HISTORY_REQUEST,
  EXECUTION_HISTORY_FAILURE,
  GET_ALL_EXECUTION_HISTORY,
  DELETE_EXECUTION_HISTORY,
  DELETE_ALL_EXECUTION_HISTORY,
  GET_EXECUTION_HISTORY_BY_ID,
  EMPTY_EXECUTION_HISTORY,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
  currentExecutionHistory: { process: [] },
};

const executionHistoryReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case EXECUTION_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EXECUTION_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_ALL_EXECUTION_HISTORY:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case DELETE_ALL_EXECUTION_HISTORY:
      return {
        ...state,
        loading: false,
        data: [],
      };
    case DELETE_EXECUTION_HISTORY:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case GET_EXECUTION_HISTORY_BY_ID:
      return {
        ...state,
        loading: false,
        currentExecutionHistory: payload,
      };
    case EMPTY_EXECUTION_HISTORY:
      return {
        loading: false,
        data: [],
        currentExecutionHistory: { process: [] },
      };
    default:
      return state;
  }
};

export default executionHistoryReducer;
