import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Tag, Tooltip } from 'antd'
import { CameraFilled, EyeOutlined } from '@ant-design/icons'
import ViewObjectModal from '../../Common/TestStep/ViewObjectModal'
import ViewParameterModal from '../../Common/TestStep/ViewParameterModal'
import ViewCommentModal from '../../Common/TestStep/ViewCommentModal'
import ViewScreenShotModal from './ViewScreenShotModal'
import ViewFailedLogModal from './ViewFailedLogModal'
const TestStepTable = ({ testSteps, currentExecutionHistory, process }) => {
  const [viewParameterModal, setViewParameterModal] = useState(false)
  const [parameters, setParameters] = useState([])
  const [viewObjectModal, setViewObjectModal] = useState(false)
  const [object, setObject] = useState({})
  const [viewCommentModal, setViewCommentModal] = useState(false)
  const [viewFailedLogModal, setViewFailedLogModal] = useState('')
  const [comment, setComment] = useState('')
  const [screenShotKey, setScreenshotKey] = useState('')
  const columns = [
    {
      title: <div style={{ whiteSpace: 'nowrap' }}>Action Event</div>,
      dataIndex: 'actionEvent',
    },
    {
      title: <div style={{ whiteSpace: 'nowrap' }}>Test Object</div>,
      dataIndex: 'object',
      render: (text, record) =>
        text?.name ? (
          <div>
            <Tag
              style={{
                cursor: 'pointer',
              }}
              color="#108ee9"
              onClick={() => {
                setObject(text)
                setViewObjectModal(true)
              }}
            >
              {text.name}
            </Tag>
          </div>
        ) : (
          'N/A'
        ),
    },
    {
      title: <div style={{ whiteSpace: 'nowrap' }}>Test Parameters</div>,
      dataIndex: 'testParameters',
      render: (text, record) =>
        text?.length ? (
          <div>
            <Tag
              style={{ cursor: 'pointer' }}
              color="#108ee9"
              onClick={() => {
                setParameters(text)
                setViewParameterModal(true)
              }}
            >
              <EyeOutlined /> View
            </Tag>
          </div>
        ) : (
          'N/A'
        ),
    },

    {
      title: <div style={{ whiteSpace: 'nowrap' }}>Comment</div>,
      dataIndex: 'comment',
      render: (text, record) =>
        text.length ? (
          <div>
            <Tag
              style={{ cursor: 'pointer' }}
              color="#108ee9"
              onClick={() => {
                setComment(text)
                setViewCommentModal(true)
              }}
            >
              <EyeOutlined /> View
            </Tag>
          </div>
        ) : (
          'N/A'
        ),
    },
    {
      title: <CameraFilled style={{ fontSize: 15 }} />,
      width: 50,
      dataIndex: 'options',
      render: (text, record) => (
        <>
          {record.screenshot && (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setScreenshotKey(
                  `${currentExecutionHistory.id}/${process.processId}_${record.testStepId}`
                )
              }}
            >
              <CameraFilled style={{ fontSize: 15 }} />
            </div>
          )}
        </>
      ),
    },
    {
      title: <div style={{ whiteSpace: 'nowrap' }}>Result</div>,
      width: 100,
      dataIndex: 'result',
      render: (text, record) =>
        text === true ? (
          <div
            style={{
              color: 'green',
              fontWeight: 600,
              width: 40,
            }}
          >
            PASS
          </div>
        ) : text === false ? (
          <Tooltip title="View Log">
            <div
              style={{
                color: 'red',
                fontWeight: 600,
                width: 40,
                cursor: 'pointer',
              }}
              onClick={() => {
                setViewFailedLogModal(record.failedLog)
              }}
            >
              FAIL
            </div>
          </Tooltip>
        ) : (
          <div style={{ color: 'grey', fontWeight: 600, width: 40 }}>N/A</div>
        ),
    },
  ]

  return (
    <>
      <Table
        scroll={{ x: true }}
        size="small"
        columns={columns}
        dataSource={testSteps}
        pagination={false}
        sticky
        rowKey="id"
      />
      {viewObjectModal && (
        <ViewObjectModal
          visible={viewObjectModal}
          setVisible={setViewObjectModal}
          object={object}
          history={true}
          setObject={setObject}
        />
      )}

      {viewParameterModal && (
        <ViewParameterModal
          visible={viewParameterModal}
          setVisible={setViewParameterModal}
          parameters={parameters}
        />
      )}

      {viewCommentModal && (
        <ViewCommentModal
          visible={viewCommentModal}
          setVisible={setViewCommentModal}
          comment={comment}
        />
      )}
      {screenShotKey && (
        <ViewScreenShotModal
          visible={screenShotKey}
          setVisible={setScreenshotKey}
        />
      )}
      {viewFailedLogModal && (
        <ViewFailedLogModal
          visible={viewFailedLogModal}
          setVisible={setViewFailedLogModal}
        />
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  currentExecutionHistory: state.executionHistory.currentExecutionHistory,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TestStepTable)
