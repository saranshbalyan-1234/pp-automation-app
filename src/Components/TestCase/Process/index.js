import React, { useEffect, useState } from "react";
import { Popconfirm, Collapse, Tag, Tooltip, FloatButton } from "antd";
import {
  getTestCaseStepsById,
  deleteProcess,
  deleteStep,
} from "../../../Redux/Actions/testCase";
import { connect, useDispatch } from "react-redux";
import ProcessMenu from "./ProcessMenu";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import TestStepTable from "../../Common/TestStep";
import AddEditProcessModal from "./AddEditProcessModal";
import ViewCommentModal from "../../Common/TestStep/ViewCommentModal";
import Loading from "../../Common/Loading";
import { usePermission } from "../../../Utils/permission";
import { VscDebugRestart } from "react-icons/vsc";
import { EMPTY_TEST_CASE } from '../../../Redux/Actions/action-types'
const { Panel } = Collapse;
const Process = ({
  getTestCaseStepsById,
  process,
  deleteProcess,
  deleteStep,
  loading,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const editTestCasePermission = usePermission("Test Case", "edit");
  const [addEditProcessModal, setAddEditProcessModal] = useState(false);
  const [addReusable, setAddReusable] = useState(false);
  const [comment, setComment] = useState(false);
  const [editProcessData, setEditProcessData] = useState({});
  const [edit, setEdit] = useState(true);
  const { testCaseId } = useParams();

  useEffect(() => {
    // dispatch({ type: EMPTY_TEST_CASE })
    testCaseId && getTestCaseStepsById(testCaseId);
    // eslint-disable-next-line
  }, [testCaseId]);

  return (
    <>
      <Loading loading={loading}>
        {process.map((item, index) => {
          return (
            <Collapse style={{ marginTop: "10px" }} key={"process_" + index} className={item.enable ? "dark" : "light"}>
              <Panel
                header={
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <ProcessMenu process={item} />

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      >
                        {`Process ${index + 1} : `}

                        {item.reusableProcess && (
                          <Tooltip
                            title="Reusable Process"
                            color="blue">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                  `/reusable-process/${item.reusableProcess.id}/details`
                                );
                              }}
                              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}

                            >
                              <VscDebugRestart style={{ fontSize: 16 }} />
                            </div>
                          </Tooltip>
                        )}

                        {item.reusableProcess?.name || item.name}

                      </div>

                    </div>
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {item.comment && (
                        <Tag
                          color="#108ee9"
                          onClick={() => {
                            setComment(item.comment);
                          }}
                        >
                          <EyeOutlined /> View Comment
                        </Tag>
                      )}
                      <Tag color="blue" style={{ cursor: "default" }}>
                        Step Count :&nbsp;
                        {item.testSteps.length > 9
                          ? item.testSteps.length
                          : `0${item.testSteps.length}`}
                      </Tag>
                      <EditOutlined
                        style={{
                          color: editTestCasePermission ? "black" : "grey",
                          cursor: editTestCasePermission
                            ? "pointer"
                            : "not-allowed",
                        }}
                        onClick={() => {
                          if (!editTestCasePermission) return;
                          setEditProcessData(item);
                          setAddEditProcessModal(true);
                        }}
                      />
                      <Popconfirm
                        placement="left"
                        title="Are you sure to remove this process?"
                        onConfirm={async (e) => {
                          e.stopPropagation();
                          await deleteProcess(
                            item.id,
                            item.step,
                            testCaseId,
                            item.name,
                            item.reusableProcess
                          );
                        }}
                        okText="Yes, Remove"
                        cancelText="No"
                        disabled={!editTestCasePermission}
                        onCancel={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <DeleteOutlined
                          style={{
                            color: editTestCasePermission ? "black" : "grey",
                            cursor: editTestCasePermission
                              ? "pointer"
                              : "not-allowed",
                          }}
                        />
                      </Popconfirm>
                    </div>
                  </div>
                }
              >
                <TestStepTable
                  testSteps={item.testSteps}
                  process={item}
                  reusableProcess={item.reusableProcess}
                  deleteStep={deleteStep}
                />
              </Panel>
            </Collapse>
          );
        })}
        {process.length === 0 && (
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEdit(false);
              setAddReusable(false);
              setAddEditProcessModal(true);
            }}
          >
            Add First Process
          </Tag>
        )}
        {process.length === 0 && (
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEdit(false);
              setAddReusable(true);
              setAddEditProcessModal(true);
            }}
          >
            Add First Reusable Process
          </Tag>
        )}
      </Loading>
      {addEditProcessModal && (
        <AddEditProcessModal
          visible={addEditProcessModal}
          setVisible={setAddEditProcessModal}
          editData={editProcessData}
          setEditData={setEditProcessData}
          edit={edit}
          step={1}
          setEdit={setEdit}
          addReusable={addReusable}
        />
      )}
      {comment && (
        <ViewCommentModal
          comment={comment}
          visible={comment}
          setVisible={setComment}
        />
      )}
      <FloatButton.BackTop target={() => document.getElementById("right_container")} />
    </>
  );
};

const mapStateToProps = (state) => ({
  process: state.testCase.currentTestCase.process,
  loading: state.testCase.loading,
});

const mapDispatchToProps = { getTestCaseStepsById, deleteProcess, deleteStep };

export default connect(mapStateToProps, mapDispatchToProps)(Process);
