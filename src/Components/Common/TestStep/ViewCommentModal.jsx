import React from "react";
import { Modal } from "antd";
import DOMPurify from 'dompurify'
export default function ViewCommentModal({ comment, visible, setVisible }) {
  return (
    <Modal
      title="Comment"
      centered
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(comment),
        }}
      ></div>
    </Modal>
  );
}
