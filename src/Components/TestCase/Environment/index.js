import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Table, Button, Popconfirm } from "antd";
import CustomSearch from "../../Common/Search";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AddModal from "./AddModal";
import { connect } from "react-redux";
import {
  getAllEnvironments,
  updateColumnValue,
  deleteColumn,
  deleteEnvironment,
} from "../../../Redux/Actions/environment";
import { usePermission } from "../../../Utils/permission";
import Loading from "../../Common/Loading";
import styled from "styled-components";
const Environment = ({
  visible,
  setVisible,
  currentTestCaseId,
  getAllEnvironments,
  environments,
  loading,
  updateColumnValue,
  deleteColumn,
  deleteEnvironment,
}) => {
  const editTestCasePermission = usePermission("Test Case", "edit");
  const [columns, setColumns] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [addModal, setAddModal] = useState({ active: false });

  useEffect(() => {
    setSearchedData(environments);
    // eslint-disable-next-line
  }, [environments]);
  useEffect(() => {
    getAllEnvironments(currentTestCaseId);
    // eslint-disable-next-line
  }, [currentTestCaseId]);
  const handleUpdateValue = (record, column, e) => {
    updateColumnValue({
      envId: record.envId,
      name: column,
      value: e.target.innerText,
    });
  };
  useEffect(() => {
    if (environments.length === 0) return;

    const tempDynamicKeys = Object.keys(environments[0]).map((el) => {
      let temp = {};
      if (el !== "Environment" && el !== "envId") {
        temp.title = (
          <div
            style={{
              paddingLeft: 10,
              whiteSpace: "nowrap",
              overflow: "scroll",
            }}
          >
            {el}
            <Popconfirm
              placement="left"
              title={`Are you sure to delete this Column?`}
              onConfirm={async (e) => {
                e.stopPropagation();
                await deleteColumn(el);
              }}
              okText="Yes, Delete"
              cancelText="No"
              disabled={!editTestCasePermission}
              onCancel={(e) => {
                e.stopPropagation()
              }}
            >
              <DeleteOutlined
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: 14,
                  marginLeft: 5,
                  color: editTestCasePermission ? "black" : "grey",
                  cursor: editTestCasePermission ? "pointer" : "not-allowed",
                }}
              />
            </Popconfirm>
          </div>
        );
        temp.width = 250;
        temp.dataIndex = el;
      } else {
        temp.title = el;
        temp.width = 120;
        temp.dataIndex = el;
        temp.fixed = "left"
      }
      //   title:

      //     ) : (
      //       el
      //     ),
      //   dataIndex: el,
      //   width: 100,
      // };
      if (el !== "Environment") {
        temp.render = (text, record) => (
          <div style={{ minHeight: 30 }}>
            <div
              className={editTestCasePermission ? "show-boundary" : ""}
              style={{ minHeight: 25 }}
              contentEditable={editTestCasePermission}
              onBlur={(e) => handleUpdateValue(record, el, e)}
            >
              {text}
            </div>
          </div>
        );
      }
      return temp;
    });
    const dynamicKeys = tempDynamicKeys.filter((el) => {
      return el.title !== "envId";
    });
    setColumns([
      ...dynamicKeys,
      {
        title: "",
        key: "actions",
        render: (_, record) => (
          <Popconfirm
            placement="left"
            title={`Are you sure to delete this Env?`}
            onConfirm={async (e) => {
              e.stopPropagation();
              await deleteEnvironment(record.envId);
            }}
            okText="Yes, Delete"
            cancelText="No"
            disabled={!editTestCasePermission}
            onCancel={(e) => {
              e.stopPropagation()
            }}
          >
            <DeleteOutlined
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: 17,
                color: editTestCasePermission ? "black" : "grey",
                cursor: editTestCasePermission ? "pointer" : "not-allowed",
              }}
            />
          </Popconfirm>
        ),
        width: 50,
      },
    ]);
    // eslint-disable-next-line
  }, [environments.length > 0 && Object.keys(environments[0]).length]);

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    const temp = environments.filter((el) => {
      return Object.keys(environments[0]).some((el1) => {
        return (
          el1 !== "envId" &&
          el[el1] &&
          String(el[el1]).toLowerCase().includes(value)
        );
      });
    });
    setSearchedData(temp);
  };

  return (
    <>
      <Modal
        width={1000}
        centered
        open={visible}
        footer={false}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <StyledEnvContainer>
          <Loading loading={loading}>
            <div
              style={{ maxHeight: "70vh", overflow: "auto", minHeight: "70vh" }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  marginRight: 20,
                }}
              >
                <CustomSearch
                  width="310px"
                  placeholder={`Search By Env Name or Column Value`}
                  onSearch={handleSearch}
                />
                <div className="row">
                  <Button
                    type="primary"
                    ghost
                    style={{ marginBottom: 5 }}
                    onClick={() => {
                      // setRows([...rows, { env: "Enter Name", editing: true }]);
                      setAddModal({ active: true, type: "Column" });
                    }}
                    disabled={
                      searchedData.length === 0 || !editTestCasePermission
                    }
                  >
                    <PlusOutlined /> Column
                  </Button>
                  <Button
                    type="primary"
                    style={{ marginBottom: 5 }}
                    onClick={() => {
                      // setRows([...rows, { env: "Enter Name", editing: true }]);
                      setAddModal({ active: true, type: "Environment" });
                    }}
                    disabled={!editTestCasePermission}
                  >
                    <PlusOutlined />
                    Environment
                  </Button>
                </div>
              </div>
              <Table
                scroll={{ x: columns.length * 250 - 330 }}
                size="small"
                columns={columns}
                dataSource={searchedData}
                pagination={false}
                sticky
                rowKey="id"
              />
            </div>
          </Loading>
        </StyledEnvContainer >
      </Modal>
      {addModal.active && (
        <AddModal
          visible={addModal.active}
          type={addModal.type}
          setVisible={setAddModal}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentTestCaseId: state.testCase.currentTestCase?.id,
  environments: state.environment.data,
  loading: state.environment.loading,
});
const mapDispatchToProps = {
  getAllEnvironments,
  updateColumnValue,
  deleteColumn,
  deleteEnvironment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Environment);


const StyledEnvContainer = styled.div`
.ant-table-body{
 height: calc(70vh - 80px)
}
`