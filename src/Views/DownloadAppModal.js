import React from "react";
import { Modal, Card } from "antd";
import { AnimateOnHover } from '../Components/Common/AnimatePage'
import { WindowsFilled, AppleFilled } from '@ant-design/icons'
import { DiLinux } from "react-icons/di"
const DownloadAppModal = ({ visible, setVisible }) => {
  const downloadApp = async (type) => {
    window.open(
      "https://qualitycuredmain.s3.ap-south-1.amazonaws.com/Public/" + type
    );
  };
  return (
    <Modal
      open={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={false}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        Select your OS Type
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <AnimateOnHover>
          <Card
            bordered
            hoverable
            onClick={() => {
              downloadApp("application-win.exe.zip");
            }}
          >
            <WindowsFilled style={{ fontSize: 50 }} />
          </Card>
        </AnimateOnHover>
        <AnimateOnHover>
          <Card
            bordered
            hoverable
            onClick={() => {
              downloadApp("application-macos.zip");
            }}
          >
            <AppleFilled style={{ fontSize: 50 }} />
          </Card>
        </AnimateOnHover>
        <AnimateOnHover>
          <Card
            bordered
            hoverable
            onClick={() => {
              downloadApp("application-linux.zip");
            }}
          >
            <DiLinux style={{ fontSize: 50 }} />
          </Card>
        </AnimateOnHover>
      </div>
    </Modal>
  );
};

export default DownloadAppModal;
