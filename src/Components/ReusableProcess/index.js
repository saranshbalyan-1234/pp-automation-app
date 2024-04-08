import React from "react";
import List from "../Common/List";
import ReusableProcessTabs from "./ReusableProcessTabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteReusableProcess,
  getReusableProcessByProject,
  saveReusableProcess,
} from "../../Redux/Actions/reusableProcess";
import { usePermission } from "../../Utils/permission";
const ReusableProcess = ({
  loading,
  getReusableProcessByProject,
  deleteReusableProcess,
  reusableProcess,
  saveReusableProcess,
}) => {
  const addReusableProcessPermission = usePermission("Reusable Process", "add");
  const deleteReusableProcessPermission = usePermission("Reusable Process", "delete");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <List
              data={reusableProcess}
              loading={loading}
              onDelete={deleteReusableProcess}
              name="Reusable Process"
              link="reusable-process"
              onSave={saveReusableProcess}
              getList={getReusableProcessByProject}
              addPermission={addReusableProcessPermission}
              deletePermission={deleteReusableProcessPermission}
            />
          }
        />
        <Route
          path="/:reusableProcessId/:tab"
          element={<ReusableProcessTabs />}
        />
      </Routes>
    </>
  );
};
const mapStateToProps = (state) => ({
  reusableProcess: state.reusableProcess.data,
  loading: state.reusableProcess.loading,
});

const mapDispatchToProps = {
  getReusableProcessByProject,
  deleteReusableProcess,
  saveReusableProcess,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReusableProcess);
