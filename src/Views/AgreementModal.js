import React from "react";
import { Avatar, List, Modal } from "antd";
import { FileDoneOutlined } from "@ant-design/icons"
import { StyledWrapper } from "../Auth/style";

const data = [
  {
    title: `User Agreement`,
    avatar: <FileDoneOutlined style={{ fontSize: 20 }} />,
    description: "This user agreement is last updated on 5 August 2021",
    content: (
      <div style={{ lineHeight: "30px", fontSize: "16px" }}>
        Please read these Terms carefully before you start to use the Services.
        By using the Services or signing up for an account, you accept and agree
        to be bound and abide by these Terms, Privacy Policy, and other
        applicable policies and terms of the Agreement.
        <br />
        <br />
        <p style={{ fontWeight: "bold" }}>
          If you do not agree to the full Agreement, you must not access or use
          the Services.
        </p>
      </div>
    ),
  },
];

const AgreementModal = ({ visible, setVisible }) => {
  return (
    <Modal
      open={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={false}
      width={1000}
    >
      <StyledWrapper>
        <List
          itemLayout="vertical"
          size="large"
          pagination={false}
          dataSource={data}
          footer={false}
          renderItem={(item) => (
            <List.Item key={item.title}>
              <List.Item.Meta
                avatar={<FileDoneOutlined style={{ fontSize: 40 }} />}
                title={item.title}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />

        {/* </div> */}
      </StyledWrapper>
    </Modal>
  );
};

export default AgreementModal;
