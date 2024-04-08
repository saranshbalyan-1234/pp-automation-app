import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Modal } from "antd";
import { changePassword } from "../../../Redux/Actions/user";
import Loading from "../../Common/Loading";
const ChangePasswordModal = ({
  setChangePasswordModal,
  changePasswordModal,
  changePassword,
}) => {
  const [loading, setLoading] = useState(false);
  const onFinish = async (data) => {
    setLoading(true);
    await changePassword(data).then(() => {
      setChangePasswordModal(false);
    });
    setLoading(false);
  };

  return (
    <Modal
      centered
      title="Change Password"
      open={changePasswordModal}
      onCancel={() => setChangePasswordModal(false)}
      footer={false}
      // closable={false}
    >
      <Loading loading={loading}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please input your old password!",
              },
            ]}
          >
            <Input.Password showCount maxLength={15} />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password showCount maxLength={15} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setChangePasswordModal(false);
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { changePassword };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordModal);
