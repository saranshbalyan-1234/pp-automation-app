import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import AddEditExecutionSuiteTestCaseModal from "./AddEditExecutionSuiteTestCaseModal";
export default function StepMenu({
  testCase,
  editExecutionSuitePermission,
}) {
  const [addEditExecutionSuiteTestCaseModal, setAddEditExecutionSuiteTestCaseModal] = useState(false);
  const [step, setStep] = useState(0);
  const items = [
    {
      label: (
        <>
          <PlusOutlined style={{ marginRight: "5px" }} /> Add Test Case Before
        </>
      ),
      key: "1",
      onClick: (e) => {
        e.domEvent.stopPropagation();
        setStep(testCase.step);
        setAddEditExecutionSuiteTestCaseModal(true);
      },
      disabled:!editExecutionSuitePermission,
    },
    {
      label: (
        <>
          <PlusOutlined style={{ marginRight: "5px" }} /> Add Test Case After
        </>
      ),
      key: "2",
      onClick: (e) => {
        e.domEvent.stopPropagation();
        setStep(testCase.step + 1);
        setAddEditExecutionSuiteTestCaseModal(true);
      },
      disabled: !editExecutionSuitePermission
    },
  ]

  return (
    <>
      <Dropdown menu={{ items }} trigger={["hover"]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SettingOutlined />
        </div>
      </Dropdown>
      {addEditExecutionSuiteTestCaseModal && (
        <AddEditExecutionSuiteTestCaseModal
          visible={addEditExecutionSuiteTestCaseModal}
          setVisible={setAddEditExecutionSuiteTestCaseModal}
          step={step}
        />
      )}
    </>
  );
}
