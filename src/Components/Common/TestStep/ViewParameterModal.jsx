import React from "react";
import { List, Typography, Modal } from "antd";
export default function ViewParameterModal({
  parameters = [],
  visible,
  setVisible,
}) {
  return (
    <Modal
      title="Parameters"
      centered
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <List
        bordered
        dataSource={parameters}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{`[${item.type}]:  `}</Typography.Text>
            {item.property}
          </List.Item>
        )}
      />
    </Modal>
  );
}
