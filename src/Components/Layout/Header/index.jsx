import React, { useEffect } from 'react'
import { Layout, Dropdown, Menu, message } from 'antd'
import ProfileMenu from './ProfileMenu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CaretDownOutlined, ProjectOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getAllProject, getProjectById } from '../../../Redux/Actions/project'
import { getTeam } from '../../../Redux/Actions/team'
import { myStatus } from '../../../Redux/Actions/user'
import Loading from '../../Common/Loading'
const { Header } = Layout

const Headers = ({
  getAllProject,
  projects,
  defaultProjectId,
  getProjectById,
  getTeam,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    getProject()
    getTeam()
    myStatus()
    // eslint-disable-next-line
  }, [])

  const getProject = async () => {
    if (projects.currentProject.id)
      await getProjectById(projects.currentProject.id)
    else if (defaultProjectId) await getProjectById(defaultProjectId)
    else {
      const data = await getAllProject()
      if (data.length > 0) {
        await getProjectById(data[0].id)
      } else {
        message.error('No project found!')
        navigate('/project')
      }
    }
  }

  const items = [
    {
      key: 'all',
      label: <Link to="/project">View All</Link>,
    },
  ]

  return (
    <Header style={{ padding: 0, background: '#001529' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div></div>

        {location.pathname === '/' ||
        location.pathname === '/dashboard' ||
        location.pathname.toLowerCase().includes('settings') ? (
          <div></div>
        ) : (
          <Loading loading={projects.loading}>
            <div
              style={{
                color: 'white',
              }}
            >
              <ProjectOutlined style={{ marginRight: 7 }} />
              Current Project:
              {projects.currentProject.name ? (
                <>&nbsp;&nbsp;{projects.currentProject.name}</>
              ) : (
                ' No Project Selected'
              )}
            </div>
          </Loading>
        )}
        <div style={{ marginRight: '20px' }}>
          <ProfileMenu />
        </div>
      </div>
    </Header>
  )
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  defaultProjectId: state.auth.user.defaultProjectId,
})

const mapDispatchToProps = { getAllProject, getProjectById, getTeam }

export default connect(mapStateToProps, mapDispatchToProps)(Headers)
