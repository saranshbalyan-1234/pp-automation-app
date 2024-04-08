import {
EXECUTION_SUITE_REQUEST,
EXECUTION_SUITE_FAILURE,
GET_ALL_EXECUTION_SUITE,
CREATE_EXECUTION_SUITE,
UPDATE_CURRENT_EXECUTION_SUITE,
DELETE_EXECUTION_SUITE,
GET_EXECUTION_SUITE_DETAILS_BY_ID,
GET_EXECUTION_SUITE_TEST_CASE_BY_ID,
ADD_EXECUTION_SUITE_TEST_CASE,
EDIT_EXECUTION_SUITE_TEST_CASE,
DELETE_EXECUTION_SUITE_TEST_CASE,
    GET_EXECUTION_SUITE_LOGS,EMPTY_EXECUTION_SUITE
} from "../Actions/action-types";
import { orderBy } from "lodash";
const initState = {
  loading: false,
  data: [],
  currentExecutionSuite: { testCases: [] },
};

const executionSuiteReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case EXECUTION_SUITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_EXECUTION_SUITE:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case EXECUTION_SUITE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_EXECUTION_SUITE:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case CREATE_EXECUTION_SUITE:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case UPDATE_CURRENT_EXECUTION_SUITE:
      return {
        ...state,
        loading: false,
        currentExecutionSuite: {
          ...state.currentExecutionSuite,
          ...payload,
        },
      };
    case GET_EXECUTION_SUITE_DETAILS_BY_ID:
      return {
        ...state,
        currentExecutionSuite: { ...state.currentExecutionSuite, ...payload },
        loading: false,
      };
    case GET_EXECUTION_SUITE_LOGS:
      return {
        ...state,
        currentExecutionSuite: {
          ...state.currentExecutionSuite,
          logs: payload,
        },
        loading: false,
      };
    case GET_EXECUTION_SUITE_TEST_CASE_BY_ID:
      return {
        ...state,
        currentExecutionSuite: {
          ...state.currentExecutionSuite,
          testCases: payload,
        },
        loading: false,
      };
    case ADD_EXECUTION_SUITE_TEST_CASE:
      const editedTestCases = [
        ...[...state.currentExecutionSuite.testCases].map((testCase) => {
          return testCase.step >= payload.step
            ? { ...testCase, step: testCase.step + 1 }
            : testCase;
        }),
        payload,
      ];

      const orderedTestCase = orderBy([...editedTestCases], ["step"], ["asc"]);

      return {
        ...state,
        currentExecutionSuite: {
          ...state.currentExecutionSuite,
          testCases: orderedTestCase,
        },
        loading: false,
      };
    case DELETE_EXECUTION_SUITE_TEST_CASE:
      const deletedTestCase = [...state.currentExecutionSuite.testCases]
        .filter((step) => {
          return step.id !== payload.id;
        })
        .map((el) => {
          return el.step > payload.step ? { ...el, step: el.step - 1 } : el;
        });

      return {
        ...state,
        currentExecutionSuite: {
          ...state.currentExecutionSuite,
          testCases: deletedTestCase,
        },
        loading: false,
      };

    case EDIT_EXECUTION_SUITE_TEST_CASE:
      const editTestCase = [...state.currentExecutionSuite.testCases].map((el) => {
        return el.id === payload.id ? payload : el;
      });
      return {
        ...state,
        currentExecutionSuite: {
          ...state.currentExecutionSuite,
          testCases: editTestCase,
        },
        loading: false,
      };
    case EMPTY_EXECUTION_SUITE:
      return {
        loading: false,
        data: [],
        currentExecutionSuite: { testCases: [] },
      };
    default:
      return state;
  }
};

export default executionSuiteReducer;
