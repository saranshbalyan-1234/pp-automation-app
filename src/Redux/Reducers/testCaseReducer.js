import {
  TEST_CASE_REQUEST,
  GET_ALL_TEST_CASE,
  TEST_CASE_FAILURE,
  DELETE_TEST_CASE,
  CREATE_TEST_CASE,
  UPDATE_CURRENT_TEST_CASE,
  GET_TEST_CASE_DETAILS_BY_ID,
  GET_TEST_CASE_STEPS_BY_ID,
  ADD_PROCESS,
  EDIT_PROCESS,
  DELETE_PROCESS,
  ADD_STEP,
  DELETE_STEP,
  EDIT_STEP,
  EMPTY_TEST_CASE,
  GET_TEST_CASE_LOGS,
  GET_ACTION_EVENTS,
  COPY_TEST_CASE_PROCESS
} from "../Actions/action-types";
import { orderBy } from "lodash";
const initState = {
  loading: false,
  data: [],
  currentTestCase: { process: [] },
  copyProcess: {},
  actionEvents: [],
};

const testCaseReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case TEST_CASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_TEST_CASE:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case COPY_TEST_CASE_PROCESS:
      return {
        ...state,
        copyProcess: payload,
        loading: false,
      };
    case GET_ACTION_EVENTS:
      return {
        ...state,
        actionEvents: payload,
        loading: false,
      };
    case TEST_CASE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TEST_CASE:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case CREATE_TEST_CASE:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case UPDATE_CURRENT_TEST_CASE:
      return {
        ...state,
        loading: false,
        currentTestCase: { ...state.currentTestCase, ...payload },
      };
    case GET_TEST_CASE_DETAILS_BY_ID:
      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          ...payload,
        },
        loading: false,
      };
    case GET_TEST_CASE_LOGS:
      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          logs: payload,
        },
        loading: false,
      };
    case GET_TEST_CASE_STEPS_BY_ID:
      return {
        ...state,
        currentTestCase: { ...state.currentTestCase, process: payload },
        loading: false,
      };
    case ADD_PROCESS:
      const changedStepProcess = [...state.currentTestCase.process].map(
        (el) => {
          return el.step >= payload.step ? { ...el, step: el.step + 1 } : el;
        }
      );
      const orderedProcess = orderBy(
        [...changedStepProcess, { ...payload }],
        ["step"],
        ["asc"]
      );

      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          process: orderedProcess,
        },
        copyProcess: {},
        loading: false,
      };
    case EDIT_PROCESS:
      const editedProcess = [...state.currentTestCase.process].map((el) => {
        return el.id === payload.id ? { ...el, ...payload } : el;
      });
      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          process: editedProcess,
        },
        loading: false,
      };

    case DELETE_PROCESS:
      let deletedProcess = [...state.currentTestCase.process]
        .filter((el) => {
          return el.id !== payload.processId;
        })
        .map((el) => {
          return el.step > payload.step ? { ...el, step: el.step - 1 } : el;
        });
      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          process: deletedProcess,
        },
        loading: false,
      };
    case ADD_STEP:
      const editedStep = [...state.currentTestCase.process].map((el) => {
        return el.id === payload.processId
          ? {
            ...el,
            testSteps: orderBy(
              [
                ...[...el.testSteps].map((step) => {
                  return step.step >= payload.step
                    ? { ...step, step: step.step + 1 }
                    : step;
                }),
                payload,
              ],
              ["step"],
              ["asc"]
            ),
          }
          : el;
      });
      const orderedStepProcess = orderBy([...editedStep], ["step"], ["asc"]);

      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          process: orderedStepProcess,
        },
        loading: false,
      };

    case DELETE_STEP:
      const deletedStep = [...state.currentTestCase.process].map((el) => {
        return el.id === payload.processId
          ? {
            ...el,
            testSteps: [...el.testSteps]
              .filter((step) => {
                return step.id !== payload.testStepId;
              })
              .map((el1) => {
                return el1.step > payload.step
                  ? { ...el1, step: el1.step - 1 }
                  : el1;
              }),
          }
          : el;
      });

      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          process: deletedStep,
        },
        loading: false,
      };

    case EDIT_STEP:
      const editStep = [...state.currentTestCase.process].map((el) => {
        return el.id === payload.processId
          ? {
            ...el,
            testSteps: [...el.testSteps].map((step) => {
              return step.id === payload.id ? payload : step;
            }),
          }
          : el;
      });

      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          process: editStep,
        },
        loading: false,
      };
    case EMPTY_TEST_CASE:
      return {
        loading: false,
        data: [],
        currentTestCase: { process: [] },
        copyProcess: {},
        actionEvents: [],
      };
    default:
      return state;
  }
};

export default testCaseReducer;
