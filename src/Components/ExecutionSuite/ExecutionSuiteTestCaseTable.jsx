import React, { useState, useEffect } from 'react'
import StepMenu from './StepMenu'
import { Table, Tag, Popconfirm, Select } from 'antd'
import AddEditExecutionSuiteTestCaseModal from './AddEditExecutionSuiteTestCaseModal'
import { DeleteOutlined } from '@ant-design/icons'
import { usePermission } from '../../Utils/permission'
import { removeTestCaseFromSuite } from '../../Redux/Actions/executionSuite'
import { connect } from 'react-redux'
import Loading from '../Common/Loading'

const ExecutionSuiteTestCaseTable = ({
  testCases,
  removeTestCaseFromSuite,
  executionSuite,
  loading = false,
  setExecutionPayload,
  executionPayload,
}) => {
  const editExecutionSuitePermission = usePermission('Execution Suite', 'edit')
  const addExecutionSuitePermission = usePermission('Execution Suite', 'add')
  const [
    addEditExecutionSuiteTestCaseModal,
    setAddEditExecutionSuiteTestCaseModal,
  ] = useState(false)

  useEffect(() => {
    const initialPayload = testCases.map((el) => {
      let temp = { id: el.testCase.id }
      if (el.testCase.environments.length > 0) {
        temp.environment = el.testCase.environments[0].id
      }
      return temp
    })
    setExecutionPayload(initialPayload)
  }, [testCases])

  const handleEnvChange = (e, index) => {
    let temp = [...executionPayload]
    temp[index].environment = e
    setExecutionPayload(temp)
  }

  const columns = [
    {
      title: '',
      width: 40,
      dataIndex: 'action',
      render: (text, record) => (
        <div className="pointer">
          <StepMenu
            executionSuite={executionSuite}
            testCase={record}
            editExecutionSuitePermission={editExecutionSuitePermission}
          />
        </div>
      ),
    },
    {
      title: '',
      width: 40,
      dataIndex: 'index',
      render: (text, record, index) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {index + 1}
        </div>
      ),
    },
    {
      title: 'Test Case Name',
      dataIndex: 'testCase',
      render: (text, record, index) => <div>{record.testCase.name}</div>,
    },
    {
      title: <div style={{ whiteSpace: 'nowrap' }}>Environment</div>,
      width: 300,
      dataIndex: 'environments',
      render: (text, record, index) =>
        record.testCase.environments.length > 0 ? (
          <Select
            showSearch
            optionFilterProp="children"
            style={{ minWidth: '160px' }}
            defaultValue={record.testCase.environments[0].id}
            onChange={(e) => {
              handleEnvChange(e, index)
            }}
          >
            {record.testCase.environments.map((el, i) => {
              return (
                <Select.Option value={el.id} key={i}>
                  {el.name}
                </Select.Option>
              )
            })}
          </Select>
        ) : (
          'N/A'
        ),
    },
    {
      title: '',
      width: 40,
      dataIndex: 'delete',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: 10, cursor: 'pointer' }}>
          <Popconfirm
            placement="left"
            title="Are you sure to remove this step?"
            onConfirm={async (e) => {
              e.stopPropagation()
              await removeTestCaseFromSuite(
                record.id,
                record.step,
                process,
                executionSuite
              )
            }}
            okText="Yes, Remove"
            cancelText="No"
            disabled={!editExecutionSuitePermission}
            onCancel={(e) => {
              e.stopPropagation()
            }}
          >
            <DeleteOutlined
              style={{
                cursor: editExecutionSuitePermission
                  ? 'pointer'
                  : 'not-allowed',
                color: editExecutionSuitePermission ? 'black' : 'grey',
              }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <Loading loading={loading}>
      <Table
        scroll={{ x: true }}
        locale={{
          emptyText: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'start',
                cursor: 'pointer',
              }}
              onClick={() => {
                setAddEditExecutionSuiteTestCaseModal(true)
              }}
              disabled={!addExecutionSuitePermission}
            >
              <Tag> Add First Test Case</Tag>
            </div>
          ),
        }}
        columns={columns}
        dataSource={testCases}
        pagination={false}
        sticky
        size="middle"
        rowKey="id"
      />
      {addEditExecutionSuiteTestCaseModal && (
        <AddEditExecutionSuiteTestCaseModal
          visible={addEditExecutionSuiteTestCaseModal}
          setVisible={setAddEditExecutionSuiteTestCaseModal}
          step={1}
        />
      )}
    </Loading>
  )
}

const mapStateToProps = (state) => ({
  testCases: state.executionSuite.currentExecutionSuite.testCases,
  loading: state.executionSuite.loading,
})

const mapDispatchToProps = { removeTestCaseFromSuite }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExecutionSuiteTestCaseTable)
