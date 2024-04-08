import React, { useEffect, useState } from 'react'
import {
  DashboardOutlined,
  FileOutlined,
  BankOutlined,
  ProjectOutlined,
} from '@ant-design/icons'
import { VscDebugRestart, VscFiles } from 'react-icons/vsc'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
const { Sider } = Layout
function Sidebar({
  collapsed,
  setCollapsed,
  currentProjectId,
  viewTestCasePermission,
  viewReusableProcessPermission,
  viewExecutionSuitePermission,
  viewObjectBankPermission,
  viewProjectPermission,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedMenu, setSelectedMenu] = useState('Dashboard')

  useEffect(() => {
    let temp = location.pathname.split('/')
    location.pathname.length > 1
      ? setSelectedMenu(temp[1])
      : setSelectedMenu('Dashboard')
  }, [location.pathname])

  const handleMenuClick = (data) => {
    const path = data.keyPath.reverse().join('/')
    path === 'Dashboard' ? navigate(`/`) : navigate(`/${path}`)
  }

  const items = [
    {
      label: <hr className="menuDivider" />,
      key: 'DashboardDivider1',
      type: 'group',
    },
    {
      label: 'Dashboard',
      key: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      label: 'Projects',
      key: 'Project',
      icon: <ProjectOutlined />,
      disabled: !viewProjectPermission,
    },
    {
      label: <hr className="menuDivider" />,
      key: 'DashboardDivider2',
      type: 'group',
    },
    {
      label: 'Test Case',
      key: 'test-case',
      icon: <FileOutlined />,
      disabled: !currentProjectId || !viewTestCasePermission,
    },
    {
      label: 'Reusable Process',
      key: 'reusable-process',
      icon: <VscDebugRestart />,
      disabled: !currentProjectId || !viewReusableProcessPermission,
    },
    {
      label: 'Object Bank',
      key: 'object-bank',
      icon: <BankOutlined />,
      disabled: !currentProjectId || !viewObjectBankPermission,
    },
    {
      label: <hr className="menuDivider" />,
      key: 'DashboardDivider3',
      type: 'group',
    },
    {
      label: 'Execution Suite',
      key: 'execution-suite',
      icon: <VscFiles style={{ fontSize: 16 }} />,
      disabled: !currentProjectId || !viewExecutionSuitePermission,
    },
  ]

  return (
    <Sider
      trigger={null}
      collapsible
      defaultCollapsed={true}
      collapsed={collapsed}
      breakpoint="lg"
      // collapsedWidth={window.innerWidth < 720 ? 0 : 80}
      onBreakpoint={(broken) => {}}
      onMouseEnter={() => {
        setCollapsed(false)
      }}
      onMouseLeave={() => {
        setCollapsed(true)
      }}
    >
      <div>
        <img
          alt="logo"
          src={`https://qualitycuredmain.s3.ap-south-1.amazonaws.com/Public/Logo/${
            collapsed ? 'iconlogo' : 'logo'
          }.svg`}
          className="logo"
          style={{
            height: '32px',
            width: collapsed ? '60px' : '151px',
            cursor: 'pointer',
            backgroundColor: 'white',
            // transition: "width 0.2s",
          }}
          onClick={() => {
            navigate('/dashboard')
          }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedMenu}
        style={{ marginTop: '-4px' }}
        onClick={handleMenuClick}
        items={items}
      />
      ;
    </Sider>
  )
}

const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject?.id,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
