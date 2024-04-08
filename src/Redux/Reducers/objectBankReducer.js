import {
  GET_ALL_TEST_OBJECT,
  CREATE_TEST_OBJECT,
  UPDATE_TEST_OBJECT,
  OBJECT_BANK_REQUEST,
  OBJECT_BANK_FAILURE,
  GET_OBJECT_DETAILS_BY_ID,
  DELETE_TEST_OBJECT,
  GET_OBJECT_LOCATORS,
  ADD_OBJECT_LOCATOR,
  DELETE_OBJECT_LOCATOR,
  EMPTY_OBJECT_BANK,
  GET_OBJECT_LOGS,
} from "../Actions/action-types";
const initState = {
  loading: false,
  data: [],
  currentObject: { locators: [], logs: [] },
};

const objectBankReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case OBJECT_BANK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_TEST_OBJECT:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case OBJECT_BANK_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TEST_OBJECT:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case CREATE_TEST_OBJECT:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case UPDATE_TEST_OBJECT:
      return {
        ...state,
        loading: false,
        currentObject: {
          ...state.currentObject,
          ...payload,
        },
      };
    case GET_OBJECT_DETAILS_BY_ID:
      return {
        ...state,
        currentObject: { ...state.currentObject, ...payload },
        loading: false,
      };
    case GET_OBJECT_LOCATORS:
      return {
        ...state,
        currentObject: {
          ...state.currentObject,
          locators: payload,
        },
        loading: false,
      };
    case GET_OBJECT_LOGS:
      return {
        ...state,
        currentObject: {
          ...state.currentObject,
          logs: payload,
        },
        loading: false,
      };
    case ADD_OBJECT_LOCATOR:
      return {
        ...state,
        currentObject: {
          ...state.currentObject,
          locators: [...state.currentObject.locators, payload],
        },
        loading: false,
      };
    case DELETE_OBJECT_LOCATOR:
      const deletedLocator = [...state.currentObject.locators].filter(
        (step) => {
          return step.id !== payload;
        }
      );

      return {
        ...state,
        currentObject: {
          ...state.currentObject,
          locators: deletedLocator,
        },
        loading: false,
      };
    case EMPTY_OBJECT_BANK:
      return {
        loading: false,
        data: [],
        currentObject: { locators: [], logs: [] },
      };
    default:
      return state;
  }
};

export default objectBankReducer;
