import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Details from "./Details";
import ActivityLog from "../Common/ActivityLog";
import { getObjectLogsById } from "../../Redux/Actions/object";
function ObjectBankTabs({ logs, getObjectLogsById, loading }) {
  const { tab, objectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleActiveTab = (value) => {
    navigate(`/object-bank/${objectId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  useEffect(() => {
    tab === "logs" && getObjectLogsById(objectId);
    // eslint-disable-next-line
  }, [tab]);

  const items = [{
    key: 'details',
    label: `Details`,
    children: activeTab === "details" && <Details />
  },

  {
    key: 'logs',
    label: `Logs`,
    children: activeTab === "logs" && <ActivityLog logs={logs} loading={loading} />
  }]


  return (
    <Tabs
      activeKey={activeTab}
      style={{ minWidth: "100%" }}
      onChange={handleActiveTab}
      items={items}
    />
  );
}
const mapStateToProps = (state) => ({
  logs: state.objectBank.currentObject.logs,
  loading: state.objectBank.loading,
});
const mapDispatchToProps = { getObjectLogsById };

export default connect(mapStateToProps, mapDispatchToProps)(ObjectBankTabs);
