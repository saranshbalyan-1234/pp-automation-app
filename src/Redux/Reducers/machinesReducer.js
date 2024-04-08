import {
  MACHINES_REQUEST,
  MACHINES_FAILURE,
  GET_ALL_MACHINES,
  ADD_MACHINE,
  REMOVE_MACHINE,
  MACHINES_VERSION_CHECK
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
};

const machinesReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case MACHINES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_MACHINES:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case MACHINES_VERSION_CHECK:
      return {
        ...state,
        loading: false,
      };
    case MACHINES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case REMOVE_MACHINE:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case ADD_MACHINE:
      return {
        ...state,
        loading: false,
        data: [...state.data, { ...payload }],
      };
    default:
      return state;
  }
};

export default machinesReducer;
