import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  getAllProject,
  getProjectById,
  deleteProject,
} from '../../Redux/Actions/project'
import { editDetails } from '../../Redux/Actions/user'
import AddEditProjectModal from './AddEditProjectModal'
import { Avatar, Popconfirm, List, Tooltip, Button, Progress } from 'antd'
import CustomSearch from '../Common/Search'
import { AiFillCheckCircle, AiTwotoneCheckCircle } from 'react-icons/ai'
import UserAvatar from '../Common/Avatar'
import moment from 'moment'
import {
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
  EyeOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Loading from '../Common/Loading'
import { usePermission } from '../../Utils/permission'
import styled from 'styled-components'
export const AllProject = ({
  getAllProject,
  getProjectById,
  deleteProject,
  editDetails,
  projects,
  user,
}) => {
  const format = 'YYYY-MM-DD'
  const navigate = useNavigate()
  const addProjectPermission = usePermission('Project', 'add')
  const deleteProjectPermission = usePermission('Project', 'delete')
  const [addEditProjectModal, setAddEditProjectModal] = useState(false)
  const [searchedData, setSearchedData] = useState([])
  useEffect(() => {
    setSearchedData(projects.data)
    // eslint-disable-next-line
  }, [projects.data])

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase()
    const temp = projects.data.filter((el) => {
      return el.name.toLowerCase().includes(value)
    })
    setSearchedData(temp)
  }

  useEffect(() => {
    getAllProject()
    // eslint-disable-next-line
  }, [])

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
      <div>
        Start: {startDate}
        <br />
        End : {endDate} <br />
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

  const handleSelectProject = (projectId) => {
    getProjectById(projectId)
  }
  const handleDefaultProject = (projectId) => {
    editDetails({ defaultProjectId: projectId })
  }
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingTop: 10,
          marginBottom: 10,
        }}
      >
        <CustomSearch placeholder={`Search Projects`} onSearch={handleSearch} />
        <Button
          type="primary"
          ghost
          onClick={(e) => {
            e.stopPropagation()
            setAddEditProjectModal(true)
          }}
          disabled={!addProjectPermission}
        >
          New Project
        </Button>
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: 'calc(100vh - 210px)',
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <Loading loading={projects.loading}>
          <StyledRow>
            <List
              dataSource={searchedData}
              renderItem={(item) => (
                <List.Item key={`project_${item.id}`} className="project-row">
                  <List.Item.Meta
                    onClick={() => {
                      handleSelectProject(item.id)
                    }}
                    avatar={
                      <div>
                        <div
                          style={{
                            fontSize: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            marginTop: '2px',
                          }}
                        >
                          {item.id === projects.currentProject.id ? (
                            <Tooltip title="Selected">
                              <AiFillCheckCircle />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Select Project">
                              <AiTwotoneCheckCircle
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSelectProject(item.id)
                                }}
                              />
                            </Tooltip>
                          )}
                          {item.id === user.defaultProjectId ? (
                            <Tooltip title="Default Project">
                              <HeartFilled />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Make Default">
                              <HeartOutlined
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDefaultProject(item.id)
                                }}
                              />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    }
                    title={
                      <div
                        style={{
                          display: 'flex',
                          gap: '10px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div>Name: {item.name}</div>
                      </div>
                    }
                    description={
                      <div
                        style={{
                          display: 'flex ',
                          flexDirection: 'column',
                        }}
                      >
                        <div>
                          {' '}
                          <div
                            style={{
                              display: 'flex',
                              gap: '10px',
                              marginTop: '10px',
                              flexWrap: 'wrap',
                            }}
                          >
                            <div> Members:</div>
                            <div>
                              <Avatar.Group
                                size="small"
                                maxCount={5}
                                maxStyle={{
                                  color: '#f56a00',
                                  backgroundColor: '#fde3cf',
                                }}
                              >
                                {item.members
                                  .filter((el) => {
                                    return el.deletedAt === null
                                  })
                                  .map((el) => {
                                    return <UserAvatar user={el.id} />
                                  })}
                              </Avatar.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      marginRight: '50px',
                    }}
                  >
                    {formatDates(item.startDate, item.endDate)}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: '5px',
                      }}
                    >
                      <div>Author</div>
                      <UserAvatar user={item.createdByUser} />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: '10px',
                      }}
                    >
                      <Button
                        type="primary"
                        size="small"
                        ghost
                        onClick={(e) => {
                          e.stopPropagation()
                          // setAddEditProjectModal(true);
                        }}
                      >
                        <EyeOutlined
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/project/${item.id}/details`)
                          }}
                        />
                      </Button>
                      {/* <Button
                        type="primary"
                        ghost
                        size="small"
                        onClick={async () => {
                          // await setEditUserId(item.id);
                          // setManageUserModal(true);
                        }}
                      >
                        <EditOutlined />
                      </Button> */}
                      <Popconfirm
                        placement="left"
                        title="Are you sure to delete this project?"
                        onConfirm={async (e) => {
                          e.stopPropagation()
                          await deleteProject(item.id)
                        }}
                        okText="Yes, Remove"
                        cancelText="No"
                        onCancel={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <Button
                          danger
                          ghost
                          size="small"
                          disabled={!deleteProjectPermission}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Popconfirm>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '10px',
                        color: 'grey',
                      }}
                    ></div>
                  </div>
                </List.Item>
              )}
            />
          </StyledRow>
        </Loading>
      </div>
      {addEditProjectModal && (
        <AddEditProjectModal
          visible={addEditProjectModal}
          setVisible={setAddEditProjectModal}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  user: state.auth.user,
})

const mapDispatchToProps = {
  getAllProject,
  getProjectById,
  deleteProject,
  editDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProject)

const StyledRow = styled.div`
  cursor: pointer;
  .project-row:hover {
    background-color: #fafafa;
  }
`
