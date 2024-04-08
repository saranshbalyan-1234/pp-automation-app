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
  EMPTY_PROJECT,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
  currentProject: {},
};

const projectReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_ALL_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case GET_SELECTED_PROJECT:
      return {
        ...state,
        currentProject: payload,
        loading: false,
      };
    case ADD_CURRENT_PROJECT_MEMBER:
      return {
        ...state,
        loading: false,
        currentProject: {
          ...state.currentProject,
          members: [...state.currentProject.members, payload],
        },
      };

    case REMOVE_CURRENT_PROJECT_MEMBER:
      let removed = [...state.currentProject.members].filter((el) => {
        return el.id !== payload.userId;
      });
      return {
        ...state,
        currentProject: { ...state.currentProject, members: removed },
        loading: false,
      };
    case DELETE_PROJECT:
      let removedProject = [...state.data].filter((el) => {
        return el.id !== payload;
      });
      return {
        ...state,
        data: removedProject,
        loading: false,
      };
    case EDIT_PROJECT_DETAILS:
      const updatedProject = payload.data;
      return {
        ...state,
        loading: false,
        currentProject: { ...state.currentProject, ...updatedProject },
      };
    case EMPTY_PROJECT:
      return {
        loading: false,
        data: [],
        currentProject: {},
      };
    default:
      return state;
  }
};

export default projectReducer;
