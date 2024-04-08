import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Loading from '../../Common/Loading'
import { Table } from 'antd'
import { getAllMachines, removeMachine } from '../../../Redux/Actions/machines'
export const Machine = ({
  customerAdmin,
  loading,
  data,
  getAllMachines,
  removeMachine,
}) => {
  useEffect(() => {
    getAllMachines()
    // eslint-disable-next-line
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 400,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      width: 400,
    },
    {
      title: 'Created At',
      dataIndex: 'createdBy',
      width: 230,
      render: (_, record) =>
        moment(record.createdAt).format('YYYY-MM-DD hh:mm a'),
    },

    {
      title: '',
      key: 'actions',
      width: 50,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 10 }}>
          <Popconfirm
            placement="left"
            title={`Are you sure to remove this Machine?`}
            onConfirm={async (e) => {
              e.stopPropagation()
              await removeMachine(record.id)
            }}
            okText="Yes, Delete"
            cancelText="No"
            disabled={!customerAdmin}
            onCancel={(e) => {
              e.stopPropagation()
            }}
          >
            <DeleteOutlined
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: 17,
                cursor: customerAdmin ? 'pointer' : 'not-allowed',
                color: customerAdmin ? 'black' : 'grey',
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
        sticky
        columns={columns}
        dataSource={data}
        rowClassName="pointer"
        rowKey="id"
      />
    </Loading>
  )
}

const mapStateToProps = (state) => ({
  customerAdmin: state.auth.user.customerAdmin,
  loading: state.machines.loading,
  data: state.machines.data,
})

const mapDispatchToProps = { getAllMachines, removeMachine }

export default connect(mapStateToProps, mapDispatchToProps)(Machine)
