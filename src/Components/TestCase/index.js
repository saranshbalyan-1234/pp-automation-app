import React from "react";
import List from "../Common/List";
import TestCaseTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  getTestCaseByProject,
  deleteTestCase,
  saveTestCase,
} from "../../Redux/Actions/testCase";
import { usePermission } from "../../Utils/permission";
const TestCase = ({
  getTestCaseByProject,
  deleteTestCase,
  testCases,
  loading,
  saveTestCase,
}) => {
  const addTestCasePermission = usePermission("Test Case", "add");
  const deleteTestCasePermission = usePermission("Test Case", "delete");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <List
              data={testCases}
              loading={loading}
              onDelete={deleteTestCase}
              onSave={saveTestCase}
              name="Test Case"
              link="test-case"
              getList={getTestCaseByProject}
              addPermission={addTestCasePermission}
              deletePermission={deleteTestCasePermission}
            />
          }
        />
        <Route path="/:testCaseId/:tab" element={<TestCaseTabs />} />
      </Routes>
    </>
  );
};
const mapStateToProps = (state) => ({
  testCases: state.testCase.data,
  loading: state.testCase.loading,
});

const mapDispatchToProps = {
  getTestCaseByProject,
  deleteTestCase,
  saveTestCase,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCase);
