import React, { useState } from 'react'
import { Dropdown } from 'antd'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import { LuClipboardCopy, LuClipboardPaste } from 'react-icons/lu'
import { VscDebugRestart } from 'react-icons/vsc'
import AddEditProcessModal from './AddEditProcessModal'
import { useDispatch, connect } from 'react-redux'
import { COPY_TEST_CASE_PROCESS } from '../../../Redux/Actions/action-types'
import {
  addProcess,
  convertProcessToReusable,
} from '../../../Redux/Actions/testCase'
import { cloneDeep } from 'lodash'
function ProcessMenu({
  process,
  copyProcessData,
  addProcess,
  convertProcessToReusable,
  currentTestCaseId,
}) {
  const dispatch = useDispatch()
  const [addEditProcessModal, setAddEditProcessModal] = useState(false)
  const [step, setStep] = useState(0)
  const [addReusable, setAddReusable] = useState(false)

  const handlePaste = (type) => {
    let payload = cloneDeep(copyProcessData)

    if (payload.testSteps?.length > 0) {
      payload.testSteps = payload.testSteps.map((el) => {
        let temp = { ...el }
        delete temp.id
        delete temp.object
        delete temp.createdAt
        delete temp.updatedAt
        delete temp.reusableProcessId

        if (temp.testParameters?.length > 0) {
          temp.testParameters = temp.testParameters.map((param) => {
            let temp1 = { ...param }
            delete temp1.id
            delete temp1.testStepId
            delete temp1.createdAt
            delete temp1.updatedAt
            return temp1
          })
        }
        return temp
      })
    }

    if (type == 'after') {
      payload.step = process.step + 1
    } else {
      payload.step = process.step
    }
    if (payload.reusableProcess) {
      payload.name = payload.reusableProcess.name
    }

    delete payload.createdAt
    delete payload.updatedAt
    delete payload.reusableProcess
    delete payload.reusableProcessId
    delete payload.id

    payload.testCaseId = currentTestCaseId

    addProcess(payload)
  }

  const items = [
    {
      label: (
        <>
          <PlusOutlined style={{ marginRight: '5px' }} /> Add Process Before
        </>
      ),
      key: '1',
      onClick: (e) => {
        e.domEvent.stopPropagation()
        setStep(process.step)
        setAddReusable(false)
        setAddEditProcessModal(true)
      },
    },
    {
      label: (
        <>
          <PlusOutlined style={{ marginRight: '5px' }} /> Add Process After
        </>
      ),
      key: '2',
      onClick: (e) => {
        e.domEvent.stopPropagation()
        setStep(process.step + 1)
        setAddReusable(false)
        setAddEditProcessModal(true)
      },
    },
    {
      label: (
        <>
          <PlusOutlined style={{ marginRight: '5px' }} /> Add Reusable Process
          Before
        </>
      ),
      key: '3',
      onClick: (e) => {
        e.domEvent.stopPropagation()
        setStep(process.step)
        setAddReusable(true)
        setAddEditProcessModal(true)
      },
    },
    {
      label: (
        <>
          <PlusOutlined style={{ marginRight: '5px' }} /> Add Reusable Process
          After
        </>
      ),
      key: '4',
      onClick: (e) => {
        e.domEvent.stopPropagation()
        setStep(process.step + 1)
        setAddReusable(true)
        setAddEditProcessModal(true)
      },
    },
    {
      label: (
        <>
          <LuClipboardCopy style={{ marginRight: '5px' }} /> Copy Process
        </>
      ),
      key: '5',
      onClick: (e) => {
        e.domEvent.stopPropagation()
        console.log('saransh', process)
        dispatch({ type: COPY_TEST_CASE_PROCESS, payload: process })
      },
    },
    {
      label: (
        <>
          <LuClipboardPaste style={{ marginRight: '5px' }} /> Paste Process
          Before
        </>
      ),
      key: '6',
      onClick: (e) => {
        e.domEvent.stopPropagation()
        handlePaste('before')
      },
      disabled: !copyProcessData.hasOwnProperty('id'),
    },
    {
      label: (
        <>
          <LuClipboardPaste style={{ marginRight: '5px' }} /> Paste Process
          After
        </>
      ),
      key: '7',
      onClick: (e) => {
        e.domEvent.stopPropagation()
        handlePaste('after')
      },
      disabled: !copyProcessData.hasOwnProperty('id'),
    },
    {
      label: (
        <>
          <VscDebugRestart style={{ marginRight: '5px' }} /> Convert To Reusable
          Process
        </>
      ),
      key: '8',
      onClick: (e) => {
        e.domEvent.stopPropagation()
        convertProcessToReusable(process.id)
      },
      disabled: process.reusableProcessId,
    },
  ]

  return (
    <>
      <Dropdown menu={{ items }} trigger={['hover']}>
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <SettingOutlined />
        </div>
      </Dropdown>
      {addEditProcessModal && (
        <AddEditProcessModal
          visible={addEditProcessModal}
          setVisible={setAddEditProcessModal}
          step={step}
          addReusable={addReusable}
        />
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  copyProcessData: state.testCase.copyProcess,
  currentTestCaseId: state.testCase.currentTestCase.id,
})
const mapDispatchToProps = {
  addProcess,
  convertProcessToReusable,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessMenu)
