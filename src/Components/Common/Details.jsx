import React, { useState } from "react";
import { Typography, Card, Button } from "antd";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import UserAvatar from "./Avatar";
import AddEditModal from "./AddEditModal";
import Loading from "./Loading";
import DOMPurify from 'dompurify'
const { Title } = Typography;
const { Meta } = Card;
const Details = ({ loading, details, name, onEdit = () => { } }) => {
  const [addEditModal, setAddEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  if (loading) return <Loading />;
  return (
    <div style={{ paddingTop: 20 }}>
      <Loading loading={loading}>
        <Card>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              // flexWrap: 'wrap',
            }}
          >
            <Meta
              title={
                <div style={{ display: 'flex', gap: 20 }}>
                  <Title style={{ textTransform: 'capitalize' }} level={3}>
                  {details.name}
                  </Title>
                  <div style={{ color: 'black' }}>
                    Created On &nbsp;
                    {moment(details.createdAt).format('YYYY-MM-DD')} By &nbsp;
                    <UserAvatar user={details.createdByUser} />
                  </div>
                </div>
              }
              description={<></>}
            />

            <EditOutlined
              style={{ fontSize: 20, paddingLeft: 10 }}
              onClick={() => {
                setEditData(details)
                setAddEditModal(true)
              }}
            />
          </div>
          {details.description && (
            <Meta
              title="Description"
              description={
                <div
                  style={{ marginTop: '5px' }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(details.description),
                  }}
                ></div>
              }
            />
          )}
          <div style={{ display: 'flex', gap: 10, maxWidth: 500 }}>
            <div>Tags:</div>
            <div>
              {details.tags?.length > 0
                ? details.tags.map((el, i) => {
                    return <Tag key={'tag_' + i}>{el}</Tag>
                  })
                : 'N/A'}
            </div>
          </div>
        </Card>
      </Loading>
      {addEditModal && (
        <AddEditModal
          visible={addEditModal}
          setVisible={setAddEditModal}
          editData={editData}
          setEditData={setEditData}
          edit={true}
          name={name}
          onEdit={onEdit}
          loading={loading}
        />
      )}
    </div>
  )
};

export default Details;
