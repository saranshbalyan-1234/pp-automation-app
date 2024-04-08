import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, Tag, Badge, Empty, Button, Popconfirm } from 'antd'
import { deleteCustomer } from '../../../Redux/Actions/team'
import Role from '../Role'
import { UploadOutlined } from '@ant-design/icons'
import UploadProfileImage from './UploadProfileImage'
import UserAvatar from '../../Common/Avatar'
import styled from 'styled-components'
const { Meta } = Card
function Profile({ user, deleteCustomer }) {
  const [editProfileImage, setEditProfileImage] = useState(false)
  const handleDeleteCustomer = async (e) => {
    e.stopPropagation()
    await deleteCustomer()
  }
  return (
    <>
      <Badge.Ribbon text="Personal Details">
        <Card>
          <Meta
            avatar={
              <StyledUploadImage
                onClick={() => {
                  setEditProfileImage(true)
                }}
              >
                <div className="profileImage">
                  <UserAvatar user={user.id} key={user.profileImage} />
                </div>
                <div className="uploadImage">
                  <UploadOutlined />
                </div>
              </StyledUploadImage>
            }
            title={
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {user.name}
                <Tag color="blue">
                  {user.customerAdmin ? 'Customer Admin' : 'User'}
                </Tag>
              </div>
            }
            description={user.email}
          />
          {user.customerAdmin && (
            <Popconfirm
              title="This will delete all users created from this account! Are you Sure"
              onConfirm={handleDeleteCustomer}
              okText="Yes, Delete"
              cancelText="No"
              onCancel={(e) => {
                e.stopPropagation()
              }}
            >
              <Button
                danger
                ghost
                style={{ marginTop: '20px', marginLeft: '45px' }}
              >
                Delete Customer
              </Button>
            </Popconfirm>
          )}
        </Card>
      </Badge.Ribbon>
      {!user.customerAdmin && (
        <Badge.Ribbon text={'My Roles'}>
          <div style={{ paddingTop: '10px' }}>
            {user.roles.length > 0 ? (
              <Role loading={false} data={user.roles} profile={true} />
            ) : (
              <Empty description="No Role Assigned." />
            )}
          </div>
        </Badge.Ribbon>
      )}
      {editProfileImage && (
        <UploadProfileImage
          visible={editProfileImage}
          setVisible={setEditProfileImage}
        />
      )}
    </>
  )
}
const mapStateToProps = (state) => ({ user: state.auth?.user })

const mapDispatchToProps = { deleteCustomer }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const StyledUploadImage = styled.div`
  cursor: pointer;
  position: relative;

  .uploadImage {
    display: none;
    position: absolute;
    font-size: 15px;
  }
  .profileImage:hover {
    opacity: 0.2;
  }

  .profileImage:hover + .uploadImage {
    display: block;
    position: absolute;
    margin-left: 5px;
  }
`
