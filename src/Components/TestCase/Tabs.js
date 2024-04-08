import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import { PlayCircleFilled, TableOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTestCaseDetailsById,
  editTestCase,
  getTestCaseLogsById,
} from "../../Redux/Actions/testCase";
import Environment from "./Environment";
import Process from "./Process";
import TestCaseDetails from "./TestCaseDetails";
import ActivityLog from "../Common/ActivityLog";
import ExecuteModal from "./ExecuteModal";
import ExecutionHistory from "./ExecutionHistory/List";
import { usePermission } from "../../Utils/permission";
function TestCaseTabs({
  getTestCaseDetailsById,
  currentTestCase,
  loading,
  editTestCase,
  logs,
  getTestCaseLogsById,
}) {
  const viewExecutionPermission = usePermission("Execute", "view");
  const addExecutionPermission = usePermission("Execute", "add");
  const { tab, testCaseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [executeModal, setExecuteModal] = useState(false);
  const [envModal, setEnvModal] = useState(false);

  const handleActiveTab = (value) => {
    navigate(`/test-case/${testCaseId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  useEffect(() => {
    tab === "logs" && getTestCaseLogsById(testCaseId);
    // eslint-disable-next-line
  }, [tab]);

  useEffect(() => {
    testCaseId && getTestCaseDetailsById(testCaseId);
    // eslint-disable-next-line
  }, [testCaseId]);

  const renderButton = () => {
    if (activeTab === "test-steps")
      return (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 5,
            width: 250,
            display: "flex",
            gap: 10,
          }}
        >
          <Button
            type="primary"
            ghost
            onClick={() => {
              setEnvModal(true);
            }}
          >
            <TableOutlined />
            Environments
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setExecuteModal(true);
            }}
            disabled={
              !addExecutionPermission ||
              !currentTestCase.process?.some((el) => {
                return el.testSteps?.length > 0;
              })
            }
          >
            <PlayCircleFilled />
            Execute
          </Button>
        </div>
      );
  };
  let items = [{
    key: 'details',
    label: `Details`,
    children: activeTab === "details" &&
      <TestCaseDetails
        loading={loading}
        details={currentTestCase}
        onEdit={editTestCase}
      />
  },
  {
    key: 'test-steps',
    label: `Test Steps`,
    children: activeTab === "test-steps" && <Process />
  },

  {
    key: 'logs',
    label: `Logs`,
    children: activeTab === "logs" && <ActivityLog logs={logs} loading={loading} />
  }]

  if (viewExecutionPermission) items.push({
    key: 'execution-history',
    label: `Execution History`,
    children: activeTab === "execution-history" && <ExecutionHistory viewExecutionPermission={viewExecutionPermission} />
  })

  return (
    <>
      <div style={{ display: "flex", position: "relative" }}>
        <Tabs
          activeKey={activeTab}
          style={{ minWidth: "100%" }}
          onChange={handleActiveTab}
          items={items}
        />
        {renderButton()}
      </div >
      {executeModal && (
        <ExecuteModal
          setVisible={setExecuteModal}
          visible={executeModal}
          addExecutionPermission={addExecutionPermission}
        />
      )}
      {envModal && <Environment setVisible={setEnvModal} visible={envModal} />}
    </>
  );
}
const mapStateToProps = (state) => ({
  loading: state.testCase.loading,
  currentTestCase: state.testCase.currentTestCase,
  logs: state.testCase.currentTestCase.logs,
});

const mapDispatchToProps = {
  getTestCaseDetailsById,
  editTestCase,
  getTestCaseLogsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseTabs);
