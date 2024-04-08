import React from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import Details from "../../ObjectBank/Details";
import Loading from "../Loading";
const ViewObjectModal = ({ visible, setVisible, object, history }) => {
  return (
    <Modal
      centered
      width={1000}
      // title={"Object Details"}
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Loading loading={false}>
        <Details newObject={object} history={history} />
      </Loading>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewObjectModal);
