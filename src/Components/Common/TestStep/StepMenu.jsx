import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import AddEditStepModal from "./AddEditStepModal";
export default function StepMenu({
  process,
  testStep,
  reusableProcess,
  editTestCasePermission,
  editReusableProcessPermission,
}) {
  const [addEditStepModal, setAddEditStepModal] = useState(false);
  const [step, setStep] = useState(0);
  const items = [
    {
      label: (
        <>
          <PlusOutlined style={{ marginRight: "5px" }} /> Add Step Before
        </>
      ),
      key: "1",
      onClick: (e) => {
        e.domEvent.stopPropagation();
        setStep(testStep.step);
        setAddEditStepModal(true);
      },
      disabled: reusableProcess
        ? !editReusableProcessPermission
        : !editTestCasePermission,
    },
    {
      label: (
        <>
          <PlusOutlined style={{ marginRight: "5px" }} /> Add Step After
        </>
      ),
      key: "2",
      onClick: (e) => {
        e.domEvent.stopPropagation();
        setStep(testStep.step + 1);
        setAddEditStepModal(true);
      },
      disabled: reusableProcess
        ? !editReusableProcessPermission
        : !editTestCasePermission,
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
      {addEditStepModal && (
        <AddEditStepModal
          visible={addEditStepModal}
          setVisible={setAddEditStepModal}
          process={process}
          reusableProcess={reusableProcess}
          step={step}
        />
      )}
    </>
  );
}
