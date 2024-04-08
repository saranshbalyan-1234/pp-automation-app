import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  Tooltip,
  Progress,
  Card,
  Table,
  Button,
  Popconfirm,
  Tag,
} from 'antd'
import UserAvatar from '../Common/Avatar'
import moment from 'moment'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { getProjectById, removeMember } from '../../Redux/Actions/project'
import AddEditProjectModal from './AddEditProjectModal'
import AddProjectMemberModal from './AddProjectMemberModal'
import MemberBadge from '../Common/MemberBadge'
import ColumnGraph from '../Common/Graph/ColumnGraph'
import Loading from '../Common/Loading'
import { usePermission } from '../../Utils/permission'
import DOMPurify from 'dompurify'
const { Title } = Typography
const { Meta } = Card
export const ProjectDetails = ({
  currentProject,
  loading,
  getProjectById,
  removeMember,
}) => {
  const format = 'YYYY-MM-DD'

  const editProjectPermission = usePermission('Project', 'edit')
  const { projectId } = useParams()
  const [addProjectMemberModal, setAddProjectMemberModal] = useState(false)
  const [editProjectModal, setEditProjectModal] = useState(false)
  const [graphCount, setGraphCount] = useState([])

  const members = currentProject.members.filter((el) => {
    return el.deletedAt === null
  })

  useEffect(() => {
    getProject()
    // eslint-disable-next-line
  }, [projectId])

  const getProject = async () => {
    if (projectId) {
      await getProjectById(projectId)

      let count = Object.entries(currentProject.count)
        .filter((el) => {
          return (
            el[0] === 'testCase' ||
            el[0] === 'reusableProcess' ||
            el[0] === 'object'
          )
        })
        .map((el) => {
          let key = ''
          if (el[0] === 'testCase') {
            key = 'Test Case'
          } else if (el[0] === 'reusableProcess') {
            key = 'Reusable Process'
          } else if (el[0] === 'object') {
            key = 'Test Object'
          }
          return { name: key, Total: el[1] }
        })

      setGraphCount(count)
    }
  }

  const formatDates = (startDate, endDate) => {
    let currentDate = moment(new Date()).format(format)
    let totalDays = moment(endDate, format).diff(
      moment(startDate, format),
      'days'
    )
    let daysPassed = moment(currentDate, format).diff(
      moment(startDate, format),
      'days'
    )
    let percentagePassed = Math.floor((daysPassed / totalDays) * 100)

    return (
      <div style={{ marginTop: 10 }}>
        <Tooltip
          title={
            <div>
              Total Days: {totalDays}
              <br />
              Days Passed: {daysPassed}
            </div>
          }
        >
          <Progress percent={percentagePassed} size="small" />
        </Tooltip>
      </div>
    )
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Status',
      key: 'action',
      render: (_, record) => (
        <Tag color={record.verifiedAt ? (record.active ? 'green' : 'red') : ''}>
          {record.verifiedAt
            ? record.active
              ? 'Active'
              : 'Inactive'
            : 'Verification Pending'}
        </Tag>
      ),
    },

    {
      title: 'Delete',
      key: 'delete',
      render: (_, record) => (
        <Popconfirm
          placement="left"
          title="Are you sure to remove this user?"
          onConfirm={async (e) => {
            e.stopPropagation()
            await removeMember({
              projectId: currentProject.id,
              userId: record.id,
            })
          }}
          okText="Yes, Remove"
          cancelText="No"
          disabled={!editProjectPermission}
          onCancel={(e) => {
            e.stopPropagation()
          }}
        >
          <DeleteOutlined
            style={{
              fontSize: 17,
              color: editProjectPermission ? 'black' : 'grey',
              cursor: editProjectPermission ? 'pointer' : 'not-allowed',
            }}
          />
        </Popconfirm>
      ),
    },
  ]
  if (loading) return <Loading loading={true} />
  return (
    <div style={{ paddingTop: 20 }}>
      <Loading loading={loading}>
        <div className="row ">
          <Card
            style={{
              maxWidth: 'calc(100% - 410px)',
              width: 'calc(100% - 410px)',
              minWidth: '400px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Meta
                title={
                  <div
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }}
                    className="row"
                  >
                    <Title style={{ textTransform: 'capitalize' }} level={3}>
                      {currentProject.name}
                    </Title>
                    <div style={{ color: 'black' }}>
                      Created On &nbsp;
                      {moment(currentProject.createdAt).format('YYYY-MM-DD')} By
                      &nbsp;
                      {currentProject.createdByUser && (
                        <UserAvatar user={currentProject.createdByUser} />
                      )}
                    </div>
                  </div>
                }
                description={
                  <>
                    <div style={{ maxWidth: 300, marginBottom: 10 }}>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 25,
                        }}
                      >
                        <Card>
                          <Meta
                            title="Start Date"
                            description={currentProject.startDate}
                          />
                        </Card>
                        <Card>
                          <Meta
                            title="End Date"
                            description={currentProject.endDate}
                          />
                        </Card>
                      </div>
                      {formatDates(
                        currentProject.startDate,
                        currentProject.endDate
                      )}
                    </div>
                  </>
                }
              />

              <EditOutlined
                style={{ paddingLeft: 10, fontSize: 20 }}
                onClick={() => {
                  setEditProjectModal(true)
                }}
              />
            </div>
            {currentProject.description && (
              <Meta
                title="Description"
                description={
                  <div
                    style={{ marginTop: '5px' }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(currentProject.description),
                    }}
                  ></div>
                }
              />
            )}
          </Card>
          <Card style={{ boxShadow: '5px 10px #f6f6f6' }}>
            <ColumnGraph data={graphCount} />
          </Card>
        </div>
        <Card style={{ marginTop: 20 }}>
          {members && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Title
                level={5}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
              >
                <div>Members</div> <div>({members.length})</div>
                <MemberBadge members={members} />
              </Title>
              <Button
                type="primary"
                ghost
                onClick={() => {
                  setAddProjectMemberModal(true)
                }}
                style={{ marginTop: '-15px' }}
              >
                <PlusOutlined />
                Add Member
              </Button>
            </div>
          )}
          <Table
            scroll={{ x: true }}
            columns={columns}
            dataSource={members.filter((el) => {
              return el.deletedAt === null
            })}
            size="small"
            rowKey="id"
          />
        </Card>
      </Loading>
      {addProjectMemberModal && (
        <AddProjectMemberModal
          visible={addProjectMemberModal}
          setVisible={setAddProjectMemberModal}
        />
      )}
      {editProjectModal && (
        <AddEditProjectModal
          visible={editProjectModal}
          setVisible={setEditProjectModal}
          edit={true}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentProject: state.projects.currentProject,
  loading: state.projects.loading,
})

const mapDispatchToProps = { getProjectById, removeMember }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)
