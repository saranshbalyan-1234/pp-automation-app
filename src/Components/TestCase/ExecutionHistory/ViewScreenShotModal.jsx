import React, { useEffect, useState } from "react";
import { Modal } from "antd";

import { connect } from "react-redux";
import Loading from "../../Common/Loading";
import axios from "axios";
const ViewScreenShotModal = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(true);
  const [imgData, setImgData] = useState("");
  useEffect(() => {
    fetchScreenShot();
    // eslint-disable-next-line
  }, []);

  const fetchScreenShot = async () => {
    setLoading(true);
    const { data } = await axios
      .post("/aws/object", {
        fileName: visible,
      })
      .catch(() => {
        setVisible(false);
      });
    setImgData(data);
    setLoading(false);
  };

  return (
    <Modal
      width={1200}
      centered
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Loading loading={loading}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!loading && (
            <img
              alt="screenshot"
              src={"data:image/jpeg;base64," + imgData}
              style={{ maxWidth: "85vw" }}
            />
          )}
        </div>
      </Loading>
    </Modal>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewScreenShotModal);
