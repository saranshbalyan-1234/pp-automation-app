import React, { useEffect, useState } from "react";
import { Card, Select } from "antd";
import ColumnGraph from "../../Common/Graph/ColumnGraph";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import Loading from "../../Common/Loading";
import { connect } from "react-redux";
const CreatedByReport = ({ user, team }) => {
  const [userId, setUserId] = useState(user?.id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.post("/dashboard/created-report", { userId }).then((res) => {
      setData(res.data);
      setLoading(false);
      let mainData = Object.entries(res.data).map((el) => {
        return { name: el[0], Total: el[1] };
      });

      setData(mainData);
    });
  }, [userId]);

  return (
    <Loading loading={loading}>
      <Card
        title={
          <div className="row">
            <EditOutlined style={{ marginRight: 10, marginTop: 5 }} />
            Items Created By
            <div>
              <Select
                size="small"
                defaultValue={user?.id}
                style={{ width: 80, marginRight: "-2px" }}
                onChange={(e) => {
                  setUserId(e);
                }}
              >
                <Select.Option key={user?.id} value={user?.id}>Me</Select.Option>
                {team.map((el) => {
                  return <Select.Option key={el.id} value={el.id}>{el.name}</Select.Option>;
                })}
              </Select>
            </div>
          </div>
        }
        className="card"
        style={{ width: 400, height: 360 }}
      >
        <div style={{ width: 350, height: 200 }}>
          <ColumnGraph data={data} width={360} />
        </div>
      </Card>
    </Loading>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  team: state.team.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreatedByReport);
