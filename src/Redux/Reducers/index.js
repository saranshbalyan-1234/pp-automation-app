import authReducer from "./authReducer";
import { combineReducers } from "redux";
import teamReducer from "./teamReducer";
import roleReducer from "./roleReducer";
import projectReducer from "./projectReducer";
import testCaseReducer from "./testCaseReducer";
import reusableProcessReducer from "./reusableProcessReducer";
import objectBankReducer from "./objectBankReducer";
import executionHistoryReducer from "./executionHistoryReducer";
import environmentReducer from "./environmentReducer";
import machinesReducer from "./machinesReducer";
import executionSuiteReducer from "./executionSuiteReducer";
export default combineReducers({
  auth: authReducer,
  team: teamReducer,
  roles: roleReducer,
  projects: projectReducer,
  testCase: testCaseReducer,
  reusableProcess: reusableProcessReducer,
  objectBank: objectBankReducer,
  executionHistory: executionHistoryReducer,
  executionSuite:executionSuiteReducer,
  environment: environmentReducer,
  machines: machinesReducer,
});
