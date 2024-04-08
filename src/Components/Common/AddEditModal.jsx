import React from "react";
import { Form, Input, Modal, Button, Select } from "antd";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import Loading from "./Loading";
const AddEditModal = ({
  visible,
  setVisible,
  currentProjectId,
  editData,
  setEditData,
  loading,
  edit = false,
  onSave,
  onEdit,
  name,
}) => {
  const onSubmit = async (data) => {
    let result = false;
    if (edit) {
      result = await onEdit(data);
      setEditData({});
    } else {
      result = await onSave({
        ...data,
        projectId: currentProjectId,
      });
    }
    result && setVisible(false);
  };

  return (
    <Modal
      centered
      width={500}
      title={edit ? `Edit ${name}` : `Create New ${name}`}
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    // closable={false}
    >
      <Loading loading={loading}>
        <Form
          name={name}
          onFinish={onSubmit}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: edit ? editData.name : "",
            description: edit ? editData.description : "",
            tags: edit
              ? editData.tags
                ? editData.tags
                : undefined
              : undefined,
          }}
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
          <Form.Item name="tags" label="Tags">
            <Select mode="tags" placeholder="Tags" />
          </Form.Item>
          <Form.Item name="description" label="">
            <ReactQuill
              style={{ width: 450 }}
              placeholder="Enter Description"
              name="description"
            />
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
  currentProjectId: state.projects.currentProject.id,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal);
