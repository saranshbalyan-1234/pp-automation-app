import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, Tag, Select } from "antd";
import axios from "axios";
import { ClockCircleOutlined } from "@ant-design/icons";
import ColumnGraph from "../../Common/Graph/ColumnGraph";
import Loading from "../../Common/Loading";
import DetailedExecutionReportModal from "./DetailedExecutionReportModal";
export const ExecutedByReport = ({ user, team }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [detailedExecutionReportModal, setDetailedExecutionReportModal] =
    useState(false);
  const [userId, setUserId] = useState(user?.id);
  const [executionHistoryData, setExecutionHistoryData] = useState([]);

  useEffect(() => {
    axios
      .post("/dashboard/execution-report", { executedByUser: userId })
      .then((res) => {
        setData(res.data);
        setLoading(false);
        let tempExecutedData = { ...res.data };
        delete tempExecutedData.Total;
        let executedData = Object.entries(tempExecutedData)
          .filter((el) => {
            return el !== "Total";
          })
          .map((el) => {
            return { name: el[0], Total: el[1] };
          });
        setExecutionHistoryData(executedData);
      });
  }, [userId]);

  return (
    <Loading loading={loading}>
      <Card
        title={
          <div
            className="row"
            style={{
              justifyContent: "space-between",
            }}
          >
            <div className="row" style={{ flexWrap: "nowrap" }}>
              <ClockCircleOutlined style={{ marginTop: "4px" }} />
              Executed By
              <div>
                <Select
                  size="small"
                  defaultValue={user?.id}
                  style={{ width: 80, marginRight: "-2px" }}
                  onChange={(e) => {
                    setUserId(e);
                  }}
                >
                  <Select.Option value={user?.id}>Me</Select.Option>
                  {team.map((el) => {
                    return (
                      <Select.Option value={el.id}>{el.name}</Select.Option>
                    );
                  })}
                </Select>
              </div>
              : {data?.Total}
              <Tag
                className="pointer"
                style={{ textAlign: "center", fontWeight: 450 }}
                onClick={() => {
                  setDetailedExecutionReportModal(true);
                }}
              >
                More Details
              </Tag>
            </div>
          </div>
        }
        className="card"
        style={{ width: 400, height: 360 }}
      >
        <div style={{ width: 350, height: 200 }}>
          <ColumnGraph data={executionHistoryData} />
        </div>
      </Card>

      {detailedExecutionReportModal && (
        <DetailedExecutionReportModal
          visible={detailedExecutionReportModal}
          setVisible={setDetailedExecutionReportModal}
          currentUserId={userId}
        />
      )}
    </Loading>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  team: state.team.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExecutedByReport);
