import {
  REUSABLE_PROCESS_REQUEST,
  REUSABLE_PROCESS_FAILURE,
  GET_ALL_REUSABLE_PROCESS,
  CREATE_REUSABLE_PROCESS,
  UPDATE_CURRENT_REUSABLE_PROCESS,
  DELETE_REUSABLE_PROCESS,
  GET_REUSABLE_PROCESS_DETAILS_BY_ID,
  GET_REUSABLE_PROCESS_STEPS_BY_ID,
  ADD_REUSABLE_STEP,
  DELETE_REUSABLE_STEP,
  EDIT_REUSABLE_STEP,
  EMPTY_REUSABLE_PROCESS,
  GET_REUSABLE_PROCESS_LOGS,
} from "../Actions/action-types";
import { orderBy } from "lodash";
const initState = {
  loading: false,
  data: [],
  currentReusableProcess: { testSteps: [] },
};

const reusableProcessReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case REUSABLE_PROCESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_REUSABLE_PROCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case REUSABLE_PROCESS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_REUSABLE_PROCESS:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case CREATE_REUSABLE_PROCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case UPDATE_CURRENT_REUSABLE_PROCESS:
      return {
        ...state,
        loading: false,
        currentReusableProcess: {
          ...state.currentReusableProcess,
          ...payload,
        },
      };
    case GET_REUSABLE_PROCESS_DETAILS_BY_ID:
      return {
        ...state,
        currentReusableProcess: { ...state.currentReusableProcess, ...payload },
        loading: false,
      };
    case GET_REUSABLE_PROCESS_LOGS:
      return {
        ...state,
        currentReusableProcess: {
          ...state.currentReusableProcess,
          logs: payload,
        },
        loading: false,
      };
    case GET_REUSABLE_PROCESS_STEPS_BY_ID:
      return {
        ...state,
        currentReusableProcess: {
          ...state.currentReusableProcess,
          testSteps: payload,
        },
        loading: false,
      };
    case ADD_REUSABLE_STEP:
      const editedStep = [
        ...[...state.currentReusableProcess.testSteps].map((step) => {
          return step.step >= payload.step
            ? { ...step, step: step.step + 1 }
            : step;
        }),
        payload,
      ];

      const orderedStepProcess = orderBy([...editedStep], ["step"], ["asc"]);

      return {
        ...state,
        currentReusableProcess: {
          ...state.currentReusableProcess,
          testSteps: orderedStepProcess,
        },
        loading: false,
      };
    case DELETE_REUSABLE_STEP:
      const deletedStep = [...state.currentReusableProcess.testSteps]
        .filter((step) => {
          return step.id !== payload.testStepId;
        })
        .map((el) => {
          return el.step > payload.step ? { ...el, step: el.step - 1 } : el;
        });

      return {
        ...state,
        currentReusableProcess: {
          ...state.currentReusableProcess,
          testSteps: deletedStep,
        },
        loading: false,
      };

    case EDIT_REUSABLE_STEP:
      const editStep = [...state.currentReusableProcess.testSteps].map((el) => {
        return el.id === payload.id ? payload : el;
      });
      return {
        ...state,
        currentReusableProcess: {
          ...state.currentReusableProcess,
          testSteps: editStep,
        },
        loading: false,
      };
    case EMPTY_REUSABLE_PROCESS:
      return {
        loading: false,
        data: [],
        currentReusableProcess: { testSteps: [] },
      };
    default:
      return state;
  }
};

export default reusableProcessReducer;
