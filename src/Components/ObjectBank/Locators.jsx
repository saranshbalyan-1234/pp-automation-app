import React from 'react'
import { connect } from 'react-redux'
import { Table, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteLocator } from '../../Redux/Actions/object'
import { usePermission } from '../../Utils/permission'
export const Locators = ({ locators, deleteLocator, history = false }) => {
  const editObjectPermission = usePermission('Test Object', 'edit')
  const handleDeleteLocator = async (id, name, type) => {
    return await deleteLocator(id, name, type)
  }
  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Locator',
      dataIndex: 'locator',
    },

    {
      title: '',
      key: 'delete',
      render: (_, record) =>
        !history && (
          <Popconfirm
            placement="left"
            title="Are you sure to remove this locator?"
            onConfirm={async (e) => {
              e.stopPropagation()
              await handleDeleteLocator(record.id, record.locator, record.type)
            }}
            okText="Yes, Remove"
            cancelText="No"
            disabled={!editObjectPermission}
            onCancel={(e) => {
              e.stopPropagation()
            }}
          >
            <DeleteOutlined
              style={{
                fontSize: 17,
                color: editObjectPermission ? 'black' : 'grey',
                cursor: editObjectPermission ? 'pointer' : 'not-allowed',
              }}
            />
          </Popconfirm>
        ),
    },
  ]

  return (
    <>
      <Table
        sticky
        columns={columns}
        dataSource={locators}
        size="small"
        rowKey="id"
      />
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { deleteLocator }

export default connect(mapStateToProps, mapDispatchToProps)(Locators)
