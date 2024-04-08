import React, { useEffect, useState } from "react";
import { Form, Modal, Button, Select } from "antd";
import { connect } from "react-redux";
import {addTestCaseToExecutionSuite} from '../../Redux/Actions/executionSuite'
import {getTestCaseByProject} from '../../Redux/Actions/testCase'
import Loading from "../Common/Loading";
import {useParams} from 'react-router-dom'
const AddEditExecutionSuiteTestCaseModal = ({
  visible,
  setVisible,
  loading,
  step,
  addTestCaseToExecutionSuite,
  testCases,
  getTestCaseByProject
}) => {
const {executionSuiteId} = useParams()

  useEffect(() => {
    if (testCases.length === 0) getTestCaseByProject();
    // eslint-disable-next-line
  }, [testCases]);


  const onSubmit = async (data) => {
    let result = false;
    let payload = {...data,step,executionSuiteId:Number(executionSuiteId)}
    result = await addTestCaseToExecutionSuite(payload)
    result && setVisible(false);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal
        width={700}
        centered
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: 27,
            }}
          >
            <div>Add New Test Case</div>
          </div>
        }
        open={visible}
        footer={false}
        onCancel={() => {
          setVisible(false);
        }}
        // closable={false}
      >
        <Loading loading={loading}>
          <Form
            name="testStep"
            onFinish={onSubmit}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              name="testCaseId"
              label="Test Case"
              rules={[
                {
                  required: true,
                  message: "Please input Name!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ minWidth: "160px" }}
                optionFilterProp="children"
              >
                {testCases.map((el, i) => {
                  return (
                    <Select.Option value={el.id} key={i}>
                      {el.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                style={{ marginRight: "20px" }}
                htmlType="submit"
              >
                Submit
              </Button>
              <Button
                style={{ marginRight: "20px" }}
                onClick={() => {
                  setVisible(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Loading>
      </Modal>

    </div>
  );
};
const mapStateToProps = (state) => ({
  testCases: state.testCase.data||[],
  loading: state.executionSuite.loading,
});
const mapDispatchToProps = {
  addTestCaseToExecutionSuite,
  getTestCaseByProject
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditExecutionSuiteTestCaseModal);
