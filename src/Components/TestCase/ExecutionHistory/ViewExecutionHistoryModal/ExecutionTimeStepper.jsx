import { Steps, Card } from "antd";
import React from "react";
import {
  ClockCircleFilled,
  CheckCircleFilled,
  PlayCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import Loading from "../../../Common/Loading";

function ExecutionTimeStepper({ loading, currentExecutionHistory }) {
  const data = {
    createdAt: moment(currentExecutionHistory.createdAt).format(
      'YYYY-MM-DD hh:mm A'
    ),
    finishedAt: moment(currentExecutionHistory.finishedAt).format(
      'YYYY-MM-DD hh:mm A'
    ),
    executionTime: currentExecutionHistory.executionTime,
    result: currentExecutionHistory.result,
    status: currentExecutionHistory.status,
  }
  return (
    <Loading loading={loading}>
      <StyledStep>
        <Card bordered>
          <Steps
            // type="inline"
            direction="horizontal"
            responsive={false}
            items={[
              {
                title: (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>Started</div>
                    <div
                      style={{
                        position: "absolute",
                        top: 30,
                        color: "rgba(0, 0, 0, 0.25)",
                        fontSize: 13,
                      }}
                    >
                      {data.createdAt}
                    </div>
                  </div>
                ),
                status: data.status !== "INCOMPLETE" ? "finish" : "process",
                icon: (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <PlayCircleFilled />
                      <div
                        style={{
                          marginLeft: 11,
                          height: 50,
                          width: 1,
                          backgroundColor:
                            data.status === "INCOMPLETE"
                              ? "#5496e8"
                              : "#f3f3f3",
                        }}
                      />
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ClockCircleFilled
                          style={{
                            color:
                              data.status === "INCOMPLETE"
                                ? "#1677ff"
                                : "rgba(0, 0, 0, 0.25)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: 10,
                            marginLeft: 10,
                            color: "rgba(0, 0, 0, 0.88)",
                            fontSize: 16,
                            lineHeight: 32,
                          }}
                        >
                          Incomplete
                        </div>

                        {data.status === "INCOMPLETE" && (
                          <div
                            style={{
                              position: "absolute",
                              left: 10,
                              marginLeft: 10,
                              color: "rgba(0, 0, 0, 0.25)",
                              fontSize: 13,
                              lineHeight: 32,
                              marginTop: 60,
                            }}
                          >
                            {data.finishedAt}
                          </div>
                        )}

                        <div
                          style={{
                            minHeight: 1,
                            minWidth: 1000,
                            backgroundColor:
                              data.status === "INCOMPLETE" &&
                              data.result === false
                                ? "red"
                                : "#f3f3f3",
                            position: "absolute",
                            left: 10,
                            marginLeft: 100,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ),
              },

              {
                title: (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      {data.status === "EXECUTING" ? "Executing" : "Complete"}
                    </div>
                    {data.status === "COMPLETE" && (
                      <div
                        style={{
                          color: "rgba(0, 0, 0, 0.25)",
                          fontSize: 13,
                          position: "absolute",
                          top: 30,
                        }}
                      >
                        {data.finishedAt}
                      </div>
                    )}
                  </div>
                ),
                status:
                  data.status === "INCOMPLETE"
                    ? "wait"
                    : data.status === "COMPLETE" && data.result
                    ? "finish"
                    : "process",
                icon: (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <ClockCircleFilled />
                    <div
                      style={{
                        marginLeft: 11,
                        height: 50,
                        width: 1,
                        backgroundColor:
                          data.status === "COMPLETE" && data.result === false
                            ? "red"
                            : "#f3f3f3",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CloseCircleFilled
                        style={{
                          color:
                            data.result === false && data.status !== "EXECUTING"
                              ? "red"
                              : "rgba(0, 0, 0, 0.25)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          left: 10,
                          marginLeft: 10,
                          color: "rgba(0, 0, 0, 0.88)",
                          fontSize: 16,
                          lineHeight: 32,
                        }}
                      >
                        Failed
                      </div>

                      {data.result === false && data.status !== "EXECUTING" && (
                        <div
                          style={{
                            position: "absolute",
                            left: 10,
                            marginLeft: 10,
                            color: "rgba(0, 0, 0, 0.25)",
                            fontSize: 13,
                            lineHeight: 32,
                            marginTop: 60,
                          }}
                        >
                          {data.executionTime}
                        </div>
                      )}
                    </div>
                  </div>
                ),
              },

              {
                title: (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>Passed</div>
                    {data.result && (
                      <div
                        style={{
                          color: "rgba(0, 0, 0, 0.25)",
                          fontSize: 13,
                        }}
                      >
                        {data.executionTime}
                      </div>
                    )}
                  </div>
                ),
                status: data.result ? "process" : "wait",
                icon: (
                  <div>
                    <CheckCircleFilled />
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </StyledStep>
    </Loading>
  );
}

const mapStateToProps = (state) => ({
  loading: state.executionHistory.loading,
  currentExecutionHistory: state.executionHistory.currentExecutionHistory,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExecutionTimeStepper);

const StyledStep = styled.div`
  min-width: 400px;
  margin-top: 10px;
  .ant-steps {
    height: 150px;
  }
  .ant-card-body {
    padding-bottom: 0px;
  }
`;
