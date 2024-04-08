import React from "react";
import { Modal } from "antd";

const ViewFailedLogModal = ({ visible, setVisible }) => {
  return (
    <Modal
      title="Logs"
      width={700}
      centered
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <div>{visible}</div>
    </Modal>
  );
};

export default ViewFailedLogModal;
