import React from "react";
import { Form, Input, Modal, Button } from "antd";
import { addRole, editRole } from "../../../Redux/Actions/role";
import { connect } from "react-redux";
import Loading from "../../Common/Loading";
const AddEditRoleModal = ({
  visible,
  setVisible,
  editRole,
  addRole,
  edit = false,
  roles,
  roleData,
  setAddPermissionModal,
  setSingleRoleData,
}) => {
  const onSubmit = async (data) => {
    if (edit) {
      let result = await editRole({ ...data, id: roleData.id });
      result && setVisible(false);
    } else {
      let result = await addRole(data);
      if (result) {
        await setSingleRoleData({ ...result, permissions: [] });
        setAddPermissionModal(true);
        setVisible(false);
      }
    }
  };

  return (
    <Modal
      centered
      title={edit ? "Edit Role" : "Add Role"}
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    // closable={false}
    >
      <Loading loading={roles.loading}>
        <Form
          name="role"
          onFinish={onSubmit}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ name: edit ? roleData.name : "" }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input role name!",
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
              {edit ? "Edit" : "Add"} Role
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
const mapStateToProps = (state) => ({ roles: state.roles });
const mapDispatchToProps = { addRole, editRole };

export default connect(mapStateToProps, mapDispatchToProps)(AddEditRoleModal);
