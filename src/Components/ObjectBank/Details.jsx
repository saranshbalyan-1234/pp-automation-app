import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Locators from './Locators'
import { useParams } from 'react-router-dom'
import { Button, Card, Typography, Tag } from 'antd'
import { getObjectDetailsById, editObject } from '../../Redux/Actions/object'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import AddLocatorsModal from './AddLocatorsModal'
import UserAvatar from '../Common/Avatar'
import moment from 'moment'
import AddEditObjectModal from './AddEditObjectModal'
import { usePermission } from '../../Utils/permission'
import Loading from '../Common/Loading'
import DOMPurify from 'dompurify'
const { Meta } = Card
const { Title } = Typography
const ObjectDetails = ({
  object,
  getObjectDetailsById,
  newObject,
  history = false,
  loading,
}) => {
  const editObjectPermission = usePermission('Test Object', 'edit')
  const { objectId } = useParams()
  const [currentObject, setCurrentObject] = useState({})
  const [addLocatorModal, setAddLocatorModal] = useState(false)
  const [addEditModal, setAddEditModal] = useState(false)
  const [editData, setEditData] = useState({})

  useEffect(() => {
    if (history) {
      setCurrentObject(newObject)
    } else {
      objectId && getObjectDetailsById(objectId)
      newObject?.id && getObjectDetailsById(newObject?.id)
      setCurrentObject(object)
    }
    // eslint-disable-next-line
  }, [objectId, newObject?.id, object?.id, history])

  useEffect(() => {
    history === false && setCurrentObject(object)
    // eslint-disable-next-line
  }, [object])

  return (
    <div style={{ paddingTop: 20 }}>
      {currentObject && (
        <Loading loading={loading}>
          <Card>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Meta
                title={
                  <div style={{ display: 'flex', gap: 20 }}>
                    <Title style={{ textTransform: 'capitalize' }} level={3}>
                      {`Object: ${currentObject.name}`}
                    </Title>
                    <div style={{ color: 'black' }}>
                      Created On &nbsp;
                      {moment(currentObject.createdAt).format('YYYY-MM-DD')} By
                      &nbsp;
                      <UserAvatar user={currentObject.createdByUser} />
                    </div>
                  </div>
                }
                description={<></>}
              />
              {!history && (
                <EditOutlined
                  style={{ fontSize: 20, paddingLeft: 10 }}
                  onClick={() => {
                    setEditData(currentObject)
                    setAddEditModal(true)
                  }}
                />
              )}
            </div>
            {currentObject.description && (
              <Meta
                title="Description"
                description={
                  <div
                    style={{ marginTop: '5px' }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(currentObject.description),
                    }}
                  ></div>
                }
              />
            )}
            <div style={{ display: 'flex', gap: 10, maxWidth: 500 }}>
              <div>Tags:</div>
              <div>
                {currentObject.tags?.length > 0
                  ? currentObject.tags.map((el, i) => {
                      return <Tag key={'tag_' + i}>{el}</Tag>
                    })
                  : 'N/A'}
              </div>
            </div>
          </Card>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {!history && (
              <Button
                type="primary"
                ghost
                style={{
                  alignSelf: 'end',
                  maxWidth: 150,
                  marginTop: 30,
                  marginBottom: 10,
                }}
                onClick={() => {
                  setAddLocatorModal(true)
                }}
                disabled={!editObjectPermission}
              >
                <PlusOutlined /> Add Locator
              </Button>
            )}
            <Locators locators={currentObject.locators} history={history} />
          </div>
        </Loading>
      )}
      {addLocatorModal && (
        <AddLocatorsModal
          visible={addLocatorModal}
          setVisible={setAddLocatorModal}
        />
      )}
      {addEditModal && (
        <AddEditObjectModal
          visible={addEditModal}
          setVisible={setAddEditModal}
          edit={true}
          editData={editData}
          setEditData={setEditData}
          loading={loading}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  object: state.objectBank.currentObject,
  loading: state.objectBank.loading,
})

const mapDispatchToProps = { editObject, getObjectDetailsById }

export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetails)
