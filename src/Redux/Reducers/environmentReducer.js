import {
  ENVIRONMENT_REQUEST,
  ENVIRONMENT_FAILURE,
  GET_ALL_ENVIRONMENT,
  DELETE_ENVIRONMENT,
  ADD_ENVIRONMENT,
  ADD_COLUMN,
  DELETE_COLUMN,
  UPDATE_COLUMN_VALUE,
  EMPTY_ENVIRONMENT,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
};

const environmentReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ENVIRONMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ENVIRONMENT_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case GET_ALL_ENVIRONMENT:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case ADD_ENVIRONMENT:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case ADD_COLUMN:
      let addedColumn = [...state.data].map((el) => {
        let temp = { ...el };
        temp[payload] = null;
        return temp;
      });
      return { ...state, loading: false, data: addedColumn };
    case DELETE_COLUMN:
      let deleteColumn = [...state.data].map((el) => {
        let temp = { ...el };
        delete temp[payload];
        return temp;
      });
      return { ...state, loading: false, data: deleteColumn };
    case DELETE_ENVIRONMENT:
      let deletedEnv = [...state.data].filter((el) => el.envId !== payload);
      return {
        ...state,
        loading: false,
        data: deletedEnv,
      };
    case UPDATE_COLUMN_VALUE:
      let updatedColumnValue = [...state.data].map((el) => {
        let temp = {};
        temp[payload.name] = payload.value;
        return el.envId === payload.envId ? { ...el, ...temp } : el;
      });
      return {
        ...state,
        loading: false,
        data: updatedColumnValue,
      };
    case EMPTY_ENVIRONMENT:
      return {
        loading: false,
        data: [],
      };
    default:
      return state;
  }
};

export default environmentReducer;
