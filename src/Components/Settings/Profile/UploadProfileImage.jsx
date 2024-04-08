import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "antd";
import Loading from "../../Common/Loading";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { uploadProfilePic } from "../../../Redux/Actions/user";
const { Dragger } = Upload;
const UploadProfileImage = ({ visible, setVisible, uploadProfilePic }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormdata] = useState(new FormData());
  const [valid, setValid] = useState(false);
  const onFinish = async () => {
    setLoading(true);
    const result = await uploadProfilePic(formData);
    result && setVisible(false);
    setLoading(false);
  };

  const handleFile = (e) => {
    formData.set("image", e.file);
    setFormdata(formData);
  };

  return (
    <Modal
      centered
      open={visible}
      onCancel={() => setVisible(false)}
      footer={false}
      closable={false}
    >
      <Loading loading={loading}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Dragger
            beforeUpload={(file) => {
              const format =
                file.type === "image/png" ||
                file.type === "image/jpg" ||
                file.type === "image/jpeg";
              if (!format) {
                message.error(`Format not supported!`);
                setValid(false);
                return false;
              }
              setValid(true);
              return false;
            }}
            maxCount={1}
            onChange={(e) => handleFile(e)}
            style={{ minWidth: 450, maxHeight: 170 }}
          >
            <p className="ant-upload-drag-icon" style={{ marginTop: -5 }}>
              <InboxOutlined />
            </p>
            <p className="ant-upload-text" style={{ marginTop: -5 }}>
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint" style={{ marginBottom: -5 }}>
              Supported Formats: JPEG, JPG, PNG
            </p>
          </Dragger>{" "}
          <div style={{ marginTop: 10 }}>
            <Button type="primary" onClick={onFinish} disabled={!valid}>
              Upload
            </Button>

            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setVisible(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Loading>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { uploadProfilePic };

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfileImage);
