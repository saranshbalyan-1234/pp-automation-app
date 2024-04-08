import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ExecutionSuiteDetails from "./ExecutionSuiteDetails";
import {
  getExecutionSuiteDetailsById,
  getExecutionSuiteTestCaseById,
  editExecutionSuite
} from "../../Redux/Actions/executionSuite";
import ExecutionSuiteTestCaseTable from "./ExecutionSuiteTestCaseTable";
import ActivityLog from "../Common/ActivityLog";
import { usePermission } from "../../Utils/permission";
import ExecuteModal from "../TestCase/ExecuteModal";
function ExecutionSuiteTabs({
  getExecutionSuiteDetailsById,
  getExecutionSuiteTestCaseById,
  editExecutionSuite,
  currentExecutionSuite,
  loading,
  testCases
}) {

  const viewExecutionPermission = usePermission("Execute", "view");
  const addExecutionPermission = usePermission("Execute", "add");
  const [executionPayload, setExecutionPayload] = useState([])

  const { tab, executionSuiteId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [executeModal, setExecuteModal] = useState(false);

  const handleActiveTab = (value) => {
    navigate(`/execution-suite/${executionSuiteId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  useEffect(() => {
    getExecutionSuiteDetailsById && getExecutionSuiteDetailsById(executionSuiteId);
    // eslint-disable-next-line
  }, [getExecutionSuiteDetailsById]);

  useEffect(() => {
    if (tab === "test-case") {
      executionSuiteId && getExecutionSuiteTestCaseById(executionSuiteId);
    }
    // eslint-disable-next-line
  }, [executionSuiteId, tab]);



  const renderButton = () => {
    if (activeTab === "test-case")
      return (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 5,
          }}
        >
          <Button
            type="primary"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setExecuteModal(true);
            }}
            disabled={!addExecutionPermission || testCases.length == 0}
          >
            <PlayCircleFilled />
            Execute
          </Button>
        </div>
      );
  };

  const items = [{
    key: 'details',
    label: `Details`,
    children: activeTab === "details" &&
      <ExecutionSuiteDetails
        name="Execution Suite"
        details={currentExecutionSuite}
        loading={loading}
        onEdit={editExecutionSuite}
      />
  },
  {
    key: 'test-case',
    label: `Test Case`,
    children: activeTab === "test-case" &&
      <ExecutionSuiteTestCaseTable setExecutionPayload={setExecutionPayload} />
  },
  ]

  if (viewExecutionPermission) items.push({
    key: 'execution-history',
    label: `Execution HIstory`,
    children: activeTab === "execution-history" && <ActivityLog loading={loading} />
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
      </div>
      {executeModal && (
        <ExecuteModal
          setVisible={setExecuteModal}
          visible={executeModal}
          addExecutionPermission={addExecutionPermission}
          executionSuite={true}
          executionSuiteData={executionPayload}
        />
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  testCases: state.executionSuite.currentExecutionSuite.testCases || [],
  currentExecutionSuite: state.executionSuite.currentExecutionSuite,
  loading: state.executionSuite.loading,
});

const mapDispatchToProps = {
  getExecutionSuiteDetailsById,
  getExecutionSuiteTestCaseById,
  editExecutionSuite,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExecutionSuiteTabs);
