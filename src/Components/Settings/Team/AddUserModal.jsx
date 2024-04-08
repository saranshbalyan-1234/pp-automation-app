import React, { useState } from "react";
import { Form, Input, Modal, Button } from "antd";
import { addTeamMember } from "../../../Redux/Actions/team";
import { connect } from "react-redux";
import Loading from "../../Common/Loading";
const AddUserModal = ({
  addUserModal,
  setAddUserModal,
  addTeamMember,
  setManageUserModal,
  setEditUserId,
}) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let object = {};
    object[name] = value;

    setDetails({ ...details, ...object });
  };
  const onSubmit = async () => {
    setLoading(true);
    const data = await addTeamMember(details);
    if (data) {
      setAddUserModal(false);
      setEditUserId(data.id);
      setManageUserModal(true);
    }
    setLoading(false);
  };

  return (
    <Modal
      centered
      title="Add User"
      open={addUserModal}
      footer={false}
      onCancel={() => {
        setAddUserModal(false);
      }}
    // closable={false}
    >
      <Loading loading={loading}>
        <Form
          name="register"
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
            <Input
              name="name"
              onChange={(e) => {
                handleDetails(e);
              }}
              showCount
              maxLength={50}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input E-mail!",
              },
            ]}
          >
            <Input
              name="email"
              onChange={(e) => {
                handleDetails(e);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              name="password"
              onChange={(e) => {
                handleDetails(e);
              }}
              showCount
              maxLength={15}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password showCount maxLength={15} />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              style={{ marginRight: "20px" }}
              htmlType="submit"
            >
              Add User
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              onClick={() => {
                setAddUserModal(false);
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

const mapDispatchToProps = { addTeamMember };

export default connect(null, mapDispatchToProps)(AddUserModal);
