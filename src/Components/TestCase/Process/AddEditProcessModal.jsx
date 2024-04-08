import React, { useEffect } from 'react'
import { Form, Input, Modal, Button, Select, Switch } from 'antd'
import { connect } from 'react-redux'
import {
  addProcess,
  editProcess,
  createTestCaseLogs,
} from '../../../Redux/Actions/testCase'
import { getReusableProcessByProject } from '../../../Redux/Actions/reusableProcess'
import ReactQuill from 'react-quill'
import Loading from '../../Common/Loading'
import { getDetailsEditedLogs } from '../../../Utils/logs'
const AddEditProcessModal = ({
  visible,
  setVisible,
  addProcess,
  currentTestCaseId,
  editData,
  editProcess,
  setEditData,
  loading,
  edit = false,
  setEdit = () => {},
  step,
  addReusable = false,
  getReusableProcessByProject,
  reusableLoading,
  reusableProcesses,
}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    if (addReusable || editData?.reusableProcess) getReusableProcessByProject()
    // eslint-disable-next-line
  }, [addReusable, editData?.reusableProcess])

  const onSubmit = async (data) => {
    if (addReusable && !data.name) {
      data.name = 'Reusable Process'
    }
    let result = false
    if (edit) {
      result = await editProcess({ data: data, processId: editData.id })

      const logs = await getDetailsEditedLogs(
        editData,
        data,
        `process at position ${step} `
      )
      logs.length > 0 && createTestCaseLogs(currentTestCaseId, logs)
      setEditData({})
    } else {
      result = await addProcess({
        ...data,
        testCaseId: currentTestCaseId,
        step,
      })

      if (addReusable) {
        const reusableName = reusableProcesses.find((el) => {
          return el.id === data.reusableProcessId
        })?.name
        createTestCaseLogs(currentTestCaseId, [
          `added new reusableProcess "${reusableName}" as process "${data.name}" at position ${step}.`,
        ])
      } else {
        createTestCaseLogs(currentTestCaseId, [
          `added new process "${data.name}" at position ${step}.`,
        ])
      }
      if (step === 1 && edit === false) setEdit(true)
    }
    result && setVisible(false)
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Modal
        centered
        title={
          edit
            ? 'Edit Process'
            : addReusable
            ? 'Add New Reusable Process'
            : 'Create New Process'
        }
        open={visible}
        footer={false}
        onCancel={() => {
          setVisible(false)
        }}
        width={600}
        // closable={false}
      >
        <Loading loading={loading || reusableLoading}>
          <Form
            form={form}
            name="process"
            onFinish={onSubmit}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              name: edit
                ? editData.name
                : addReusable
                ? 'Reusable Process'
                : '',
              comment: edit ? editData.comment : '',
              reusableProcessId: edit ? editData.reusableProcessId : '',
              enable: edit ? editData.enable : true,
            }}
          >
            {addReusable || editData?.reusableProcess ? (
              <Form.Item
                name="reusableProcessId"
                label="Reusable Process"
                rules={[
                  {
                    required: true,
                    message: 'Please select Reusable Process!',
                  },
                ]}
              >
                <Select
                  style={{ minWidth: '160px' }}
                  showSearch
                  optionFilterProp="children"
                >
                  {reusableProcesses.map((el, i) => {
                    return (
                      <Select.Option value={el.id} key={i}>
                        {el.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Name!',
                  },
                ]}
              >
                <Input name="name" showCount maxLength={50} />
              </Form.Item>
            )}
            <Form.Item name="enable" label="Enable" valuePropName="checked">
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
            <Form.Item name="comment" label="">
              {/* <Input name="comment" showCount maxLength={50} /> */}
              <ReactQuill
                style={{ width: 550 }}
                placeholder="Enter Comment"
                name="comment"
              />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="primary"
                style={{ marginRight: '20px' }}
                htmlType="submit"
              >
                Submit
              </Button>
              <Button
                style={{ marginRight: '20px' }}
                onClick={() => {
                  setVisible(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Loading>
      </Modal>
    </div>
  )
}
const mapStateToProps = (state) => ({
  currentTestCaseId: state.testCase.currentTestCase.id,
  loading: state.testCase.loading,
  reusableProcesses: state.reusableProcess.data,
  reusableLoading: state.reusableProcess.loading,
})
const mapDispatchToProps = {
  addProcess,
  editProcess,
  getReusableProcessByProject,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditProcessModal)
