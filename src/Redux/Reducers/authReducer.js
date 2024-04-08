import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  EMPTY_USER,
  UPDATE_USER_DETAIL_REQUEST,
  UPDATE_USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL_FAILURE,
} from "../Actions/action-types";

const initState = {
  loading: false,
  user: null,
};

const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        user: null,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
      };
    case UPDATE_USER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, ...payload },
      };
    case UPDATE_USER_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case EMPTY_USER:
      return {
        ...state,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
