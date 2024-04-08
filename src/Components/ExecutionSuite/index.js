import React from "react";
import List from "../Common/List";
import ExecutionSuiteTabs from "./ExecutionSuiteTabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteExecutionSuite,
  getExecutionSuiteByProject,
  saveExecutionSuite,
} from "../../Redux/Actions/executionSuite";
import { usePermission } from "../../Utils/permission";
const ExecutionSuite = ({
  loading,
  getExecutionSuiteByProject,
  deleteExecutionSuite,
  saveExecutionSuite,
  executionSuite,
}) => {
  const addExecutionSuitePermission = usePermission("Execution Suite", "add");
  const deleteExecutionSuitePermission = usePermission("Execution Suite", "edit");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <List
              data={executionSuite}
              loading={loading}
              onDelete={deleteExecutionSuite}
              name="Execution Suite"
              link="execution-suite"
              onSave={saveExecutionSuite}
              getList={getExecutionSuiteByProject}
              addPermission={addExecutionSuitePermission}
              deletePermission={deleteExecutionSuitePermission}
            />
          }
        />
        <Route
          path="/:executionSuiteId/:tab"
          element={<ExecutionSuiteTabs />}
        />
      </Routes>
    </>
  );
};
const mapStateToProps = (state) => ({
  executionSuite: state.executionSuite.data,
  loading: state.executionSuite.loading,
});

const mapDispatchToProps = {
  getExecutionSuiteByProject,
  deleteExecutionSuite,
  saveExecutionSuite,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExecutionSuite);
