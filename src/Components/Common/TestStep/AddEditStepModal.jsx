import React, { useEffect, useState } from 'react'
import { Form, Modal, Button, Select, Switch } from 'antd'
import { connect } from 'react-redux'
import { addProcess } from '../../../Redux/Actions/testCase'
import {
  addStep,
  editStep,
  createTestCaseLogs,
} from '../../../Redux/Actions/testCase'
import { getStepEditedLogs } from '../../../Utils/logs'
import { getObjectByProject } from '../../../Redux/Actions/object'
import { getActionEvents } from '../../../Redux/Actions/testCase'
import {
  addReusableStep,
  editReusableStep,
  createReusableProcessLogs,
} from '../../../Redux/Actions/reusableProcess'
import AddEditObjectModal from '../../ObjectBank/AddEditObjectModal'
import { saveObject } from '../../../Redux/Actions/object'
import ReactQuill from 'react-quill'
import Loading from '../Loading'
import Parameter from './Parameter'
import { PlusOutlined } from '@ant-design/icons'
const AddEditStepModal = ({
  visible,
  setVisible,
  editData,
  editStep,
  editReusableStep,
  setEditData,
  loading,
  reusableLoading,
  edit = false,
  step,
  addStep,
  addReusableStep,
  process,
  reusableProcess,
  currentProjectId,
  objectList,
  getObjectByProject,
  objectLoading,
  saveObject,
  setEdit = () => {},
  currentTestCaseId,
  actionEvents,
  getActionEvents,
}) => {
  const [currentEvent, setCurrentEvent] = useState({})
  const [currentXpathEvent, setCurrentXpathEvent] = useState({})
  const [addObjectModal, setAddObjectModal] = useState(false)

  const [form] = Form.useForm()

  const isXpath = Form.useWatch('xpath', form)

  useEffect(() => {
    if (actionEvents.length === 0) getActionEvents()
    else {
      if (edit)
        setCurrentEvent(
          actionEvents.find((el) => {
            return el.name === editData.actionEvent
          })
        )
      else
        setCurrentEvent(
          actionEvents.find((el) => {
            return el.name === 'Launch Website'
          })
        )
    }
    // eslint-disable-next-line
  }, [edit, actionEvents])

  useEffect(() => {
    if (!currentEvent?.object) return setCurrentXpathEvent(currentEvent)
    if (isXpath) {
      setCurrentXpathEvent((prev) => {
        let tempEvent = { ...currentEvent }
        tempEvent.testParameters = [
          { name: 'XPATH' },
          ...currentEvent?.testParameters,
        ]
        return tempEvent
      })
    } else {
      setCurrentXpathEvent((prev) => {
        let tempEvent = { ...currentEvent }
        if (tempEvent.testParameters)
          tempEvent.testParameters = currentEvent.testParameters?.filter(
            (el) => {
              return el.name !== 'XPATH'
            }
          )
        return tempEvent
      })
    }
  }, [isXpath, currentEvent])

  useEffect(() => {
    if (!currentXpathEvent) return
    let data = {}
    if (edit) {
      editData.testParameters?.forEach((el) => {
        data[el.type] = el.property
        data[el.type + '_type'] = el.method
      })
    } else {
      currentXpathEvent.testParameters?.forEach((el) => {
        if (el.defaultValue) data[el.name] = el.defaultValue
        data[el.name + '_type'] = 'Static'
      })
    }
    form.setFieldsValue(data)
    // eslint-disable-next-line
  }, [currentXpathEvent, edit])

  useEffect(() => {
    currentProjectId && getObjectByProject()
    // eslint-disable-next-line
  }, [currentProjectId])

  const onSubmit = async (data) => {
    let result = false

    let payload = { ...data, parameters: [] }
    if (data.xpath) {
      payload.objectId = null
    }
    Object.entries(data).forEach(([key, value]) => {
      if (
        ![
          'actionEvent',
          'comment',
          'enable',
          'screenshot',
          'xpath',
          'objectId',
        ].includes(key)
      ) {
        if (!key.includes('_type')) {
          let length = value?.trim()?.length
          const finalVal = length ? value : ''
          const method = data[key + '_type']
          payload.parameters.push({ type: key, property: finalVal, method })
        }
        delete payload[key]
      }
    })
    if (edit) {
      if (reusableProcess?.id && !process?.id) {
        result = await editReusableStep({
          data: payload,
          stepId: editData.id,
        })
        if (result) {
          const logs = await getStepEditedLogs(editData, payload, 'step ')
          logs.length > 0 && createReusableProcessLogs(reusableProcess.id, logs)
        }
      } else {
        result = await editStep({
          data: payload,
          stepId: editData.id,
          reusableProcessId: reusableProcess?.id,
          processId: process?.id,
        })
        if (result) {
          const logs = await getStepEditedLogs(editData, payload, 'step ')
          logs.length > 0 && createTestCaseLogs(currentTestCaseId, logs)
        }
      }

      setEditData({})
    } else {
      if (reusableProcess?.id && !process?.id) {
        result = await addReusableStep({
          ...payload,
          reusableProcessId: reusableProcess.id,
          step,
        })
        if (result) {
          createReusableProcessLogs(reusableProcess?.id, [
            `added new step at position ${step}`,
          ])
        }
      } else {
        if (reusableProcess?.id && process?.id) {
          result = await addStep({
            ...payload,
            reusableProcessId: reusableProcess.id,
            step,
            reusableId: process?.id,
          })
          if (result) {
            createReusableProcessLogs(reusableProcess.id, [
              `added new step at position ${step}`,
            ])
            createTestCaseLogs(currentTestCaseId, [
              `added new step at position ${step} in reusableProcess "${reusableProcess.name}" or process "${process.name}"`,
            ])
          }
        } else {
          result = await addStep({
            ...payload,
            processId: process?.id,
            step,
          })
          if (result) {
            createTestCaseLogs(currentTestCaseId, [
              `added new step at position ${step} in process "${process?.name}"`,
            ])
          }
        }
      }
    }
    if (step === 1 && edit === false) setEdit(true)
    result && setVisible(false)
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Modal
        width={700}
        centered
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginRight: 27,
            }}
          >
            <div>{edit ? 'Edit Step' : 'Create New Step'}</div>
            {currentXpathEvent?.object && (
              <Button
                type="primary"
                ghost
                onClick={() => {
                  setAddObjectModal(true)
                }}
              >
                <PlusOutlined /> Add New Object
              </Button>
            )}
          </div>
        }
        open={visible}
        footer={false}
        onCancel={() => {
          setVisible(false)
        }}
        // closable={false}
      >
        <Loading loading={loading || reusableLoading || objectLoading}>
          <Form
            form={form}
            name="testStep"
            onFinish={onSubmit}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              name: edit ? editData.name : '',
              comment: edit ? editData.comment : '',
              actionEvent: edit ? editData.actionEvent : 'Launch Website',
              objectId: edit ? editData.object?.id : '',
              screenshot: edit ? editData.screenshot : false,
              enable: edit ? editData.enable : true,
              xpath: edit ? editData.xpath : false,
            }}
          >
            <Form.Item
              name="actionEvent"
              label="Action Event"
              rules={[
                {
                  required: true,
                  message: 'Please input Name!',
                },
              ]}
            >
              <Select
                showSearch
                style={{ minWidth: '160px' }}
                onChange={(e) =>
                  setCurrentEvent(
                    actionEvents.find((el) => {
                      return el.name === e
                    })
                  )
                }
              >
                {actionEvents.map((el, i) => {
                  return (
                    <Select.Option value={el.name} key={i}>
                      {el.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>

            {currentXpathEvent?.object && !isXpath && (
              <Form.Item
                name="objectId"
                label="Object"
                rules={[
                  {
                    required: true,
                    message: 'Please select object!',
                  },
                ]}
              >
                <Select
                  style={{ minWidth: '160px' }}
                  showSearch
                  optionFilterProp="children"
                >
                  {objectList.map((el, i) => {
                    return (
                      <Select.Option value={el.id} key={i}>
                        {el.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            )}
            {currentXpathEvent && (
              <Parameter currentEvent={currentXpathEvent} />
            )}

            {currentXpathEvent?.object && (
              <Form.Item name="xpath" label="Xpath" valuePropName="checked">
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            )}

            <Form.Item
              name="screenshot"
              label="Screenshot"
              valuePropName="checked"
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>

            <Form.Item name="enable" label="Enable" valuePropName="checked">
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
            <Form.Item name="comment" label="">
              <ReactQuill
                style={{ width: 650 }}
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

      <AddEditObjectModal
        visible={addObjectModal}
        setVisible={setAddObjectModal}
        loading={objectLoading}
        name={'Object'}
        onSave={saveObject}
      />
    </div>
  )
}
const mapStateToProps = (state) => ({
  loading: state.testCase.loading,
  reusableLoading: state.reusableProcess.loading,
  currentProjectId: state.projects.currentProject.id,
  currentTestCaseId: state.testCase.currentTestCase.id,
  objectList: state.objectBank.data,
  objectLoading: state.objectBank.loading,
  actionEvents: state.testCase.actionEvents || [],
})
const mapDispatchToProps = {
  addProcess,
  editStep,
  addStep,
  addReusableStep,
  editReusableStep,
  getObjectByProject,
  saveObject,
  getActionEvents,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditStepModal)
