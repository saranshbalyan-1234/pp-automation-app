import React from 'react'
import { Table } from 'antd'
import moment from 'moment'
import UserAvatar from './Avatar'
import Loading from './Loading'
export default function ActivityLog({ logs = [], loading }) {
  const columns = [
    {
      title: '',
      width: 40,
      dataIndex: '',
      render: (text, record, index) => <div>{index + 1}</div>,
    },
    {
      title: 'Message',
      dataIndex: 'log',
      render: (text, record) => (
        <div
          style={{
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          <div
            style={{
              minHeight: 10,
              minWidth: 10,
              maxHeight: 10,
              maxWidth: 10,
              borderRadius: '100%',
              background: getColor(text),
            }}
          ></div>
          <div>
            <UserAvatar user={record.createdByUser} showName={true} />{' '}
            {' ' + text}
          </div>
        </div>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'executedBy',
      render: (_, record) => (
        <div>{moment(record.createdAt).format('YYYY-MM-DD hh:mm:ss a')}</div>
      ),
      width: 240,
    },
  ]

  const getColor = (log) => {
    const text = log.toLowerCase()
    return text.includes('added') || text.includes('created')
      ? '#87bc45'
      : text.includes('deleted') || text.includes('removed')
      ? '#ea5545'
      : text.includes('updated') || text.includes('edited')
      ? '#ef9b20'
      : ''
  }
  return (
    <Loading loading={loading}>
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={logs}
        sticky
        size="small"
        rowKey="id"
      />
    </Loading>
  )
}
