import React, { useEffect, useState } from "react";
import { Table, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import UserAvatar from "../../Common/Avatar";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteExecutionHistory,
  getAllExecutionHistoryByTestCase,
  deleteAllExecutionHistory,
} from "../../../Redux/Actions/executionHistory";
import ViewExecutionHistoryModal from "./ViewExecutionHistoryModal";
import Loading from "../../Common/Loading";
import { usePermission } from "../../../Utils/permission";
export const List = ({
  getAllExecutionHistoryByTestCase,
  deleteExecutionHistory,
  deleteAllExecutionHistory,
  loading,
  data,
}) => {
  const deleteExecutionPermission = usePermission("Execute", "delete");
  const { testCaseId } = useParams();
  const [executionHistoryId, setExecutionHistoryId] = useState(0);
  useEffect(() => {
    getAllExecutionHistoryByTestCase(testCaseId);
    // eslint-disable-next-line
  }, [testCaseId]);



  const deleteAllPermission = () => {
    const check = data.some(el => { return (el.status == "EXECUTING" && moment().diff(moment(el.createdAt), 'hours') < 24) })
    return !check && deleteExecutionPermission
  }

  const deletePermission = (record) => {
    const check = !deleteExecutionPermission ||
      (record.status == "EXECUTING" && moment().diff(moment(record.createdAt), 'hours') < 24)
    return !check
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      // width: 600,
    },
    {
      title: "Executed At",
      dataIndex: "executedByUser",
      render: (_, record) => (
        <div>
          {moment(record.createdAt).format("YYYY-MM-DD hh:mm a")} By &nbsp;
          <UserAvatar user={record.executedByUser} />
        </div>
      ),
      width: 240,
    },
    {
      title: "Status",
      width: 130,
      dataIndex: "status",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          {text === "COMPLETE" ? (
            <div
              style={{
                color: "green",
                fontWeight: 600,
              }}
            >
              COMPLETE
            </div>
          ) : text === "EXECUTING" ?
            moment().diff(moment(record.createdAt), 'hours') < 24 ? (
              <div style={{ color: "#1677ff", fontWeight: 600 }}>EXECUTING</div>
            ) : (<div style={{ color: "grey", fontWeight: 600 }}>INTERRUPTED</div>) : (
              <div style={{ color: "grey", fontWeight: 600 }}>INCOMPLETE</div>
            )}
        </div>
      ),
    },
    {
      title: "Result",
      width: 100,
      dataIndex: "result",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          {text === true ? (
            <div
              style={{
                color: "green",
                fontWeight: 600,
              }}
            >
              PASS
            </div>
          ) : (
            text === false &&
            record.status !== "EXECUTING" && (
              <div style={{ color: "red", fontWeight: 600 }}>FAIL</div>
            )
          )}
        </div>
      ),
    },

    {
      title: (
        <div style={{ display: "flex", gap: 10 }}>
          <Popconfirm
            placement="left"
            title={`Are you sure to delete all Execution History?`}
            onConfirm={async (e) => {
              e.stopPropagation();
              await deleteAllExecutionHistory();
            }}
            okText="Yes, Delete"
            cancelText="No"
            disabled={!deleteAllPermission()}
            onCancel={(e) => {
              e.stopPropagation()
            }}
          >
            <DeleteOutlined
              style={{
                fontSize: 17,
                color: deleteAllPermission() ? "black" : "grey",
                cursor: deleteAllPermission() ? "pointer" : "not-allowed",
              }}
            />
          </Popconfirm>
        </div>
      ),
      key: "actions",
      width: 50,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Popconfirm
            placement="left"
            title={`Are you sure to delete this Execution History?`}
            onConfirm={async (e) => {
              e.stopPropagation();
              await deleteExecutionHistory(record.id);
            }}
            okText="Yes, Delete"
            cancelText="No"
            disabled={!deletePermission(record)}
            onCancel={(e) => {
              e.stopPropagation()
            }}
          >
            <DeleteOutlined
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: 17,
                color: deletePermission(record) ? "black" : "grey",
                cursor: deletePermission(record) ? "pointer" : "not-allowed",
              }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Loading loading={loading}>
        <Table
          sticky
          columns={columns}
          dataSource={data}
          rowClassName="pointer"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                setExecutionHistoryId(record.id);
              },
            };
          }}
          rowKey="id"
        />
      </Loading>
      {executionHistoryId > 0 && (
        <ViewExecutionHistoryModal
          visible={executionHistoryId}
          setVisible={setExecutionHistoryId}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.executionHistory.data || [],
  loading: state.executionHistory.loading,
});

const mapDispatchToProps = {
  deleteExecutionHistory,
  deleteAllExecutionHistory,
  getAllExecutionHistoryByTestCase,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
