import {
  TEAM_REQUEST,
  TEAM_FAILURE,
  GET_TEAM_SUCCESS,
  ADD_TEAM_MEMBER_SUCCESS,
  REMOVE_TEAM_MEMBER_SUCCESS,
  TOGGLE_TEAM_USER_STATUS,
  EMPTY_TEAM,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
};

const teamReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case TEAM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TEAM_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case GET_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case ADD_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case REMOVE_TEAM_MEMBER_SUCCESS:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case TOGGLE_TEAM_USER_STATUS:
      let updatedStatus = [...state.data].map((el) => {
        return el.id === payload.userId
          ? { ...el, active: payload.status }
          : el;
      });
      return {
        ...state,
        loading: false,
        data: updatedStatus,
      };
    case EMPTY_TEAM:
      return {
        loading: false,
        data: [],
      };
    default:
      return state;
  }
};

export default teamReducer;
