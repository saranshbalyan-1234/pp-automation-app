import React, { useState, useEffect } from "react";
import { Modal, Select, DatePicker } from "antd";
import { Line } from "@ant-design/plots";
import axios from "axios";
import { connect } from "react-redux";
import Loading from "../../Common/Loading";
import { useParams } from "react-router-dom";
const DetailedExecutionReportModal = ({
  visible,
  setVisible,
  currentUserId,
  team,
  user,
  dashboard = true,
}) => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({});
  const [userId, setUserId] = useState(currentUserId);
  const { testCaseId } = useParams();
  useEffect(() => {
    let payload = {};
    if (dashboard) {
      payload.executedByUser = userId;
    } else {
      payload.testCaseId = Number(testCaseId);
    }
    if (range.startDate && range.endDate) {
      payload = { ...payload, ...range };
    }
    axios.post("/dashboard/detailed-execution-report", payload).then((res) => {
      setLoading(false);
      setData(res.data.data);
      setTotalCount(res.data.totalCount);
    });
    // eslint-disable-next-line
  }, [userId, range]);
  const handleRangeSelection = (date) => {
    setRange({
      startDate: `${date[0].$y}-${date[0].$M + 1}-${date[0].$D}`,
      endDate: `${date[1].$y}-${date[1].$M + 1}-${date[1].$D}`,
    });
  };
  const config = {
    data,
    xField: "date",
    yField: "value",
    seriesField: "type",
    xAxis: {
      type: "time",
    },
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };

  return (
    <Modal
      centered
      width={1000}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 30,
          }}
        >
          <div>Detailed Execution Report</div>

          <DatePicker.RangePicker onChange={handleRangeSelection} />
          {dashboard && (
            <div style={{ display: "flex", gap: 10 }}>
              Total Executed By
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
                  return <Select.Option value={el.id}>{el.name}</Select.Option>;
                })}
              </Select>
              : {totalCount}
            </div>
          )}
        </div>
      }
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Loading loading={loading}>
        <Line {...config} />
      </Loading>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  team: state.team.data,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailedExecutionReportModal);
