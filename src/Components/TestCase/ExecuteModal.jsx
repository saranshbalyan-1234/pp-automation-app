import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Modal,
  Button,
  Select,
  Switch,
  InputNumber,
  Alert,
  Radio,
} from 'antd'
import { connect } from 'react-redux'
import { executeTestCase } from '../../Redux/Actions/testCase'
import ReactQuill from 'react-quill'
import Loading from '../Common/Loading'
import { getAllMachines } from '../../Redux/Actions/machines'
import axios from 'axios'
import { FaChrome, FaFirefox, FaSafari, FaEdge } from 'react-icons/fa'
const ExecuteModal = ({
  visible,
  setVisible,
  loading,
  executeTestCase,
  currentTestCaseId,
  addExecutionPermission,
  machines,
  getAllMachines,
  machinesLoading,
  executionSuite = false,
  executionSuiteData = [],
  currentProjectId
}) => {
  const [form] = Form.useForm()
  const history = Form.useWatch('history', form)
  const [allEnvironments, setAllEnvironments] = useState([])
  const [envLoading, setEnvLoading] = useState(false)
  useEffect(() => {
    getEnvironment()
    machines.length === 0 && getAllMachines()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    machines.length > 0 &&
      form.setFieldsValue({
        machine: machines[0].url,
      })
    // eslint-disable-next-line
  }, [machines])

  const getEnvironment = async () => {
    if (executionSuite) return
    setEnvLoading(true)
    const { data } = await axios.get(
      `/environment/names/testCase/${currentTestCaseId}`
    )
    data.length > 0 &&
      form.setFieldsValue({
        environment: data[0].id,
      })
    setEnvLoading(false)
    setAllEnvironments(data)
  }
  const handleExecute = async (data) => {
    let payload = {
      ...data,
      testCases: executionSuite
        ? executionSuiteData
        : [{ id: currentTestCaseId, environment: data.environment }],
        projectId:currentProjectId
    }

    if (payload.machine) {
      delete payload.machine
      delete payload.environment
    }
    let url = data.machine || process.env.REACT_APP_DEFAULT_MACHINE
    const result = await executeTestCase(url, payload)
    if (result) setVisible(false)
  }
  return (
    <Modal
      centered
      title={`Execute`}
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false)
      }}
    >
      <Loading loading={loading || envLoading || machinesLoading}>
        <Form
          form={form}
          name="execute"
          onFinish={handleExecute}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            continueOnError: false,
            recordAllSteps: false,
            history: false,
            async: false,
            bots: 1,
            wait: 0,
            browser: 'chrome',
          }}
        >
          {history && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input Execution Name!',
                },
              ]}
            >
              <Input name="name" showCount maxLength={50} />
            </Form.Item>
          )}
          {allEnvironments.length > 0 && executionSuite == false && (
            <Form.Item
              name="environment"
              label="Environment"
              rules={[
                {
                  required: true,
                  message: 'Please Select Environment!',
                },
              ]}
            >
              <Select
                showSearch
                style={{ minWidth: '160px' }}
                optionFilterProp="children"
              >
                {allEnvironments.map((el, i) => {
                  return (
                    <Select.Option value={el.id} key={i}>
                      {el.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          )}
          {machines.length > 0 && (
            <Form.Item
              name="machine"
              label="Machine"
              rules={[
                {
                  required: true,
                  message: 'Please Select Machine!',
                },
              ]}
            >
              <Select
                showSearch
                style={{ minWidth: '160px' }}
                optionFilterProp="children"
              >
                {machines.map((el, i) => {
                  return (
                    <Select.Option value={el.url} key={i}>
                      {el.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="bots"
            label="Bots"
            rules={[
              {
                required: true,
                message: 'Please input number of bots!',
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="wait"
            label="Wait"
            rules={[
              {
                required: true,
                message: 'Please input Wait!',
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="continueOnError"
            label="Continue On Error"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
          <Form.Item
            name="history"
            label="Execution History"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
          <Form.Item name="async" label="Async" valuePropName="checked">
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
          <Form.Item name="headless" label="Headless" valuePropName="checked">
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
          {history && (
            <Form.Item
              name="recordAllSteps"
              label="Record All Steps"
              valuePropName="checked"
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          )}
          <Form.Item name="browser" label="Browser">
            <Radio.Group>
              <Radio value="chrome">
                <FaChrome style={{ fontSize: 20 }} />
              </Radio>
              <Radio value="firefox">
                <FaFirefox style={{ fontSize: 20 }} />
              </Radio>
              <Radio value="safari">
                <FaSafari style={{ fontSize: 20 }} />
              </Radio>
              <Radio value="MicrosoftEdge">
                <FaEdge style={{ fontSize: 20 }} />
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="description" label="">
            <ReactQuill
              style={{ width: 470 }}
              placeholder="Enter Description"
              name="description"
            />
          </Form.Item>
          <Alert
            message="Screenshots will only work with History"
            type="info"
            showIcon
          />
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}
          >
            <Button
              type="primary"
              style={{ marginRight: '20px' }}
              htmlType="submit"
              disabled={!addExecutionPermission}
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
  )
}
const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
  loading: state.testCase.loading,
  currentTestCaseId: state.testCase.currentTestCase.id,
  machines: state.machines.data,
  machinesLoading: state.machines.loading,
})
const mapDispatchToProps = { executeTestCase, getAllMachines }

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteModal)
