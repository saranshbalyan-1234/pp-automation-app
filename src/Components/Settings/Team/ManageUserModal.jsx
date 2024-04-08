import React, { useState, useEffect } from "react";
import { Button, Select, Modal } from "antd";
import { updateUserRole } from "../../../Redux/Actions/role";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import axios from "axios";
import Loading from "../../Common/Loading";
function ManageUser({
  visible,
  setVisible,
  userId,
  updateUserRole,
  editTeamPermission,
}) {
  const [loading, setLoading] = useState(false);
  const [availableRole, setAvailableRole] = useState([]);
  const [addedRole, setAddedRole] = useState([]);
  const [allRole, setAllRole] = useState([]);
  useEffect(() => {
    getAvailableRole();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    checkAvailableRole(allRole);
    // eslint-disable-next-line
  }, [addedRole]);

  const getAvailableRole = async () => {
    setLoading(true);

    await axios.get("/role").then((res) => {
      setAllRole(res.data);
      checkAvailableRole(res.data);
    });
    await axios.get(`/role/user/${userId}`).then((res) => {
      setAddedRole(res.data);
    });

    setLoading(false);
  };
  const checkAvailableRole = async (data) => {
    const difference = await data.filter((list) => {
      let tempAddedRole = [...addedRole];
      return !tempAddedRole.some((el) => {
        return el.name === list.name;
      });
    });
    setAvailableRole(difference);
  };

  const addEmptyRole = () => {
    setAddedRole([
      ...addedRole,
      {
        name: availableRole[0].name,
        roleId: availableRole[0].id,
        userId: userId,
      },
    ]);
  };

  const handleRowChange = (type, value, index) => {
    let temp = [...addedRole];
    temp[index][type] = value;
    setAddedRole(temp);
  };

  const handleRoleRemove = (index, role) => {
    let temp = [...addedRole];
    const tempAddedRole = [...availableRole, { name: temp[index].name }];
    setAvailableRole(tempAddedRole);

    temp.splice(index, 1);
    setAddedRole(temp);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const result = await updateUserRole(addedRole, userId);
    if (result) {
      setVisible(false);
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      title="Manager User"
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      // closable={false}
    >
      <Loading loading={loading}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {addedRole.map((role, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  marginTop: "20px",
                  alignItems: "center",
                }}
              >
                <Select
                  showSearch
                  value={role.name}
                  style={{ minWidth: "160px" }}
                  onChange={(e) => handleRowChange("name", e, index)}
                >
                  {availableRole.map((el, i) => {
                    return (
                      <Select.Option value={el.name} key={i}>
                        {el.name}
                      </Select.Option>
                    );
                  })}
                </Select>

                <DeleteOutlined
                  style={{
                    color: editTeamPermission ? "black" : "grey",
                    cursor: editTeamPermission ? "pointer" : "not-allowed",
                  }}
                  onClick={() => {
                    handleRoleRemove(index, role);
                  }}
                  disabled={!editTeamPermission}
                />
              </div>
            );
          })}
        </div>
        <Button
          type="dashed"
          onClick={addEmptyRole}
          block
          icon={<PlusOutlined />}
          style={{ marginTop: "20px" }}
          disabled={availableRole.length === 0 || !editTeamPermission}
        >
          Add Role
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            type="primary"
            style={{ marginRight: "20px" }}
            disabled={addedRole.length === 0}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              setVisible(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </Loading>
    </Modal>
  );
}

const mapDispatchToProps = { updateUserRole };

export default connect(null, mapDispatchToProps)(ManageUser);
