import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Typography, Statistic, Row, Col, Card, Button } from "antd";
import axios from "axios";
import {
  UserOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import ColumnGraph from "../Common/Graph/ColumnGraph";
import Loading from "../Common/Loading";
import ExecutedByReport from "./ExecutedByReport";
import CreatedByReport from "./CreatedByReport";
const { Title } = Typography;

export const Dashboard = ({ user }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get("/dashboard").then((res) => {
      setData(res.data);
      setLoading(false);

      let tempUserdata = { ...res.data.user };
      delete tempUserdata.total;
      let userData = Object.entries(tempUserdata).map((el) => {
        return { name: el[0], Total: el[1] };
      });
      setUserData(userData);
    });
  }, []);

  return (
    <Loading loading={loading}>
      <StyledContainer>
        <Row gutter={[16, 16]} style={{ justifyContent: "space-between" }}>
          <div className="row">
            <div className="row">
              <Col>
                <Card className="card">
                  <Statistic
                    title={
                      <div className="title">
                        <ProjectOutlined className="icon" />
                        <Title level={5}>Projects Assigned</Title>
                      </div>
                    }
                    value={data.project}
                  />
                </Card>
              </Col>
              <Col>
                <Card className="card">
                  <Statistic
                    title={
                      <div className="title">
                        <UserOutlined className="icon" />
                        <Title level={5}>Total Users</Title>
                      </div>
                    }
                    value={data.user?.total}
                  />
                </Card>
              </Col>
              <Col>
                <Card className="card">
                  <Statistic
                    title={
                      <div className="title">
                        <ClockCircleOutlined className="icon" />
                        <Title level={5}>Executed By Me</Title>
                      </div>
                    }
                    value={data.executionHistoryCount}
                  />
                </Card>
              </Col>
            </div>
          </div>
          <div style={{ color: "green" }}>All Projects Dashboard</div>
        </Row>

        <Row gutter={[16, 16]}>
          <Col>
            <Card
              title={
                <div>
                  <UserOutlined style={{ marginRight: 10 }} />
                  {`Total Users: ${data.user?.total}`}
                </div>
              }
              className="card"
              style={{ width: 400, height: 360 }}
            >
              <div style={{ width: 350, height: 200 }}>
                <ColumnGraph data={userData} />
              </div>
            </Card>
          </Col>
          <Col>
            <CreatedByReport />
          </Col>

          <Col>
            <ExecutedByReport />
          </Col>
        </Row>
      </StyledContainer>
    </Loading>
  );
};

const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const StyledContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .card {
    box-shadow: 5px 10px #f6f6f6;
    width: 220px;
  }
  .title {
    gap: 10px;
    display: flex;
  }
  .icon {
    margin-top: 3px;
    font-size: 18px;
  }
`;
