import React, { useState } from "react";
import { Form, Input, Modal, Button, Select } from "antd";
import ViewObjectModal from "../Common/TestStep/ViewObjectModal";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import Loading from "../Common/Loading";
import { editObject } from "../../Redux/Actions/object";
const AddEditObjectModal = ({
  visible,
  setVisible,
  currentProjectId,
  editData,
  setEditData,
  loading,
  edit = false,
  onSave,
  editObject,
}) => {
  const [viewObjectModal, setViewObjectModal] = useState(false);
  const [object, setObject] = useState({});
  const onSubmit = async (data) => {
    let result = false;
    if (edit) {
      result = await editObject(data);
      setEditData({});
    } else {
      result = await onSave({
        ...data,
        projectId: currentProjectId,
      });
      result && setObject(result);
    }
    if (result) {
      setViewObjectModal(true);
      setVisible(false);
    }
  };

  return (
    <>
      <Modal
        title={edit ? `Edit Object` : `Create New Object`}
        open={visible}
        footer={false}
        onCancel={() => {
          setVisible(false);
        }}
        width={500}
      // closable={false}
      >
        <Loading loading={loading}>
          <Form
            name={"Object Bank"}
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
              {/* <Input.TextArea name="description" /> */}
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
      {viewObjectModal && (
        <ViewObjectModal
          visible={viewObjectModal}
          setVisible={setViewObjectModal}
          object={object}
          setObject={setObject}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
});
const mapDispatchToProps = { editObject };

export default connect(mapStateToProps, mapDispatchToProps)(AddEditObjectModal);
