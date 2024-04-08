import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Popconfirm, Collapse, Button, Empty } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { deleteRole, getAllRole } from '../../../Redux/Actions/role'
import AddEditRoleModal from './AddEditRoleModal'
import ManagePermissionModal from './ManagePermissionModal'
import Loading from '../../Common/Loading'
import { usePermission } from '../../../Utils/permission'
// import Permission from "./Permission";
const { Panel } = Collapse
export const Role = ({
  roles,
  loading,
  profile = false,
  getAllRole,
  deleteRole,
  setAddPermissionModal,
  addPermissionModal,
  singleRoleData,
  setSingleRoleData,
}) => {
  const deleteRolePermission = usePermission('Role', 'delete')
  const editRolePermission = usePermission('Role', 'edit')
  const [addEditRoleModal, setAddEditRoleModal] = useState(false)

  useEffect(() => {
    getAllRole()
    // eslint-disable-next-line
  }, [])

  const handleRoleEdit = (item) => {
    setAddEditRoleModal(true)
    setSingleRoleData(item)
  }
  const handleAddPermission = (item) => {
    setAddPermissionModal(true)
    setSingleRoleData(item)
  }

  return (
    <>
      <Loading loading={loading}>
        {roles.map((item, index) => {
          return (
            <Collapse style={{ marginTop: '10px' }} key={index} activeKey={[]}>
              <Panel
                showArrow={false}
                header={
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      Role: {item.name}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '5px',
                        }}
                      ></div>
                    </div>
                    {profile === false && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '10px',
                        }}
                      >
                        <Button
                          type="primary"
                          ghost
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRoleEdit(item)
                          }}
                          disabled={!editRolePermission}
                        >
                          <EditOutlined style={{ cursor: 'pointer' }} /> Edit
                          Role
                        </Button>
                        <Button
                          type="primary"
                          ghost
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddPermission(item)
                          }}
                        >
                          {editRolePermission ? (
                            <>
                              <SettingOutlined /> Manage Permission
                            </>
                          ) : (
                            <>
                              <EyeOutlined />
                              View Permission
                            </>
                          )}
                        </Button>

                        <Popconfirm
                          placement="left"
                          title="Are you sure to delete this Role?"
                          onConfirm={(e) => {
                            e.stopPropagation()
                            deleteRole(item.id)
                          }}
                          okText="Yes, Delete"
                          cancelText="No"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          disabled={!deleteRolePermission}
                          onCancel={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          <Button
                            danger
                            ghost
                            size="small"
                            disabled={!deleteRolePermission}
                          >
                            <DeleteOutlined /> Delete Role
                          </Button>
                        </Popconfirm>
                      </div>
                    )}
                  </div>
                }
              >
                {/* <Permission
                  roleData={item}
                  editRolePermission={editRolePermission}
                  editable={false}
                /> */}
              </Panel>
            </Collapse>
          )
        })}
        {roles.length === 0 && <Empty description="No Data Found." />}
      </Loading>
      {addEditRoleModal && (
        <AddEditRoleModal
          visible={addEditRoleModal}
          setVisible={setAddEditRoleModal}
          edit={true}
          roleData={singleRoleData}
        />
      )}
      {addPermissionModal && (
        <ManagePermissionModal
          visible={addPermissionModal}
          setVisible={setAddPermissionModal}
          roleData={singleRoleData}
          editRolePermission={editRolePermission}
        />
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  roles: state.roles.data,
  loading: state.roles.loading,
})

const mapDispatchToProps = { deleteRole, getAllRole }

export default connect(mapStateToProps, mapDispatchToProps)(Role)
