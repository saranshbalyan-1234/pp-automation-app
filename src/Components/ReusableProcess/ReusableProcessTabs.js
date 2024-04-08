import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ReusableProcessDetails from "./ReusableProcessDetails";
import {
  getReusableProcessDetailsById,
  deleteStep,
  getReusableProcessStepsById,
  editReusableProcess,
  getReusableProcessLogsById,
} from "../../Redux/Actions/reusableProcess";
import TestStepTable from "../Common/TestStep";
import ActivityLog from "../Common/ActivityLog";
function ReusableProcessTabs({
  getReusableProcessDetailsById,
  getReusableProcessStepsById,
  testSteps,
  deleteStep,
  currentReusableProcess,
  loading,
  editReusableProcess,
  logs,
  getReusableProcessLogsById,
}) {
  const { tab, reusableProcessId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleActiveTab = (value) => {
    navigate(`/reusable-process/${reusableProcessId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);
  useEffect(() => {
    tab === "logs" && getReusableProcessLogsById(reusableProcessId);
    // eslint-disable-next-line
  }, [tab]);
  useEffect(() => {
    if (tab === "test-steps") {
      reusableProcessId && getReusableProcessStepsById(reusableProcessId);
    }
    // eslint-disable-next-line
  }, [reusableProcessId, tab]);

  useEffect(() => {
    reusableProcessId && getReusableProcessDetailsById(reusableProcessId);
    // eslint-disable-next-line
  }, [reusableProcessId]);

  const items = [{
    key: 'details',
    label: `Details`,
    children: activeTab === "details" &&
      <ReusableProcessDetails
        name="Reusable Process"
        details={currentReusableProcess}
        loading={loading}
        onEdit={editReusableProcess}
      />
  },
  {
    key: 'test-steps',
    label: `Test Steps`,
    children: activeTab === "test-steps" &&
      <TestStepTable
        reusableProcess={currentReusableProcess}
        deleteStep={deleteStep}
        testSteps={testSteps}
        loading={loading}
      />
  },
  {
    key: 'logs',
    label: `Logs`,
    children: activeTab === "logs" && <ActivityLog logs={logs} loading={loading} />
  }]


  return (
    <>
      <div style={{ display: "flex", position: "relative" }}>
        <Tabs
          activeKey={activeTab}
          style={{ minWidth: "100%" }}
          onChange={handleActiveTab}
          items={items}
        />
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  testSteps: state.reusableProcess.currentReusableProcess.testSteps,
  currentReusableProcess: state.reusableProcess.currentReusableProcess,
  logs: state.reusableProcess.currentReusableProcess.logs,
  loading: state.reusableProcess.loading,
});

const mapDispatchToProps = {
  getReusableProcessDetailsById,
  getReusableProcessStepsById,
  deleteStep,
  editReusableProcess,
  getReusableProcessLogsById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReusableProcessTabs);
