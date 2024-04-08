import React from "react";
import { Modal, Button, Select, Input, Form } from "antd";
import { addObjectLocator } from "../../Redux/Actions/object";
import { connect } from "react-redux";
import locatorTypes from "./locatorTypes";
import Loading from "../Common/Loading";
const AddLocatorsModal = ({
  visible,
  setVisible,
  loading,
  addObjectLocator,
  currentObjectId,
}) => {
  const onSubmit = async (data) => {
    let result = false;
    result = await addObjectLocator({ ...data, objectId: currentObjectId });
    result && setVisible(false);
  };

  return (
    <Modal
      centered
      title="Add Locator"
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      // closable={false}
      width={550}
    >
      <Loading loading={loading}>
        <Form
          onFinish={onSubmit}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            name="type"
            label="Locator Type"
            rules={[
              {
                required: true,
                message: "Please select locator type!",
              },
            ]}
          >
            <Select>
              {locatorTypes.map((el, i) => {
                return (
                  <Select.Option value={el} key={i}>
                    {el}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="locator"
            label="Locator"
            rules={[
              {
                required: true,
                message: "Please input Locator value!",
              },
            ]}
          >
            <Input name="locator" />
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
  );
};
const mapStateToProps = (state) => ({
  loading: state.objectBank.loading,
  currentObjectId: state.objectBank.currentObject.id,
});
const mapDispatchToProps = { addObjectLocator };

export default connect(mapStateToProps, mapDispatchToProps)(AddLocatorsModal);
