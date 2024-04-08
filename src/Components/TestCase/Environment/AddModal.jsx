import React from "react";
import { Form, Input, Modal, Button } from "antd";
import Loading from "../../Common/Loading";
import { addEnvironment, addColumn } from "../../../Redux/Actions/environment";
import { connect } from "react-redux";
const AddModal = ({
  visible,
  setVisible,
  type,
  currentTestCaseId,
  addEnvironment,
  addColumn,
  loading,
}) => {
  const onSubmit = async (data) => {
    let result = false;
    if (type === "Environment") {
      result = await addEnvironment({ ...data, testCaseId: currentTestCaseId });
    } else {
      result = await addColumn(data);
    }
    result && setVisible({ active: false });
  };

  return (
    <Modal
      centered
      width={500}
      title={`Add New ${type}`}
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible({ active: false });
      }}
    >
      <Loading loading={loading}>
        <Form
          onFinish={onSubmit}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input Name!",
              },
            ]}
          >
            <Input name="name" showCount maxLength={50} />
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
                setVisible({ active: false });
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Loading>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  currentTestCaseId: state.testCase.currentTestCase?.id,
  loading: state.environment.loading,
});
const mapDispatchToProps = { addEnvironment, addColumn };

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
