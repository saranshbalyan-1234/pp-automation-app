import React from "react";
import { Form, Input, Modal, Button } from "antd";
import { connect } from "react-redux";
import Loading from "../../Common/Loading";
import { addMachine } from "../../../Redux/Actions/machines";
const AddEditModal = ({ visible, setVisible, loading, addMachine }) => {
  const onSubmit = async (data) => {
    let result = await addMachine(data);
    result && setVisible(false);
  };

  return (
    <Modal
      centered
      width={500}
      title={`Create New Machine`}
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    // closable={false}
    >
      <Loading loading={loading}>
        <Form
          name={"Machine"}
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
          <Form.Item
            name="url"
            label="URL"
            rules={[
              {
                required: true,
                message: "Please input URL!",
              },
            ]}
          >
            <Input name="url" showCount maxLength={100} />
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
const mapStateToProps = (state) => ({ loading: state.machines.loading });
const mapDispatchToProps = { addMachine };

export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal);
