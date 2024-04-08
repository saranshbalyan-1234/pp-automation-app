import React, { useState, useEffect } from "react";
import { Button, Checkbox, Select } from "antd";
import { updateRolePermission } from "../../../Redux/Actions/role";
import { connect } from "react-redux";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Loading from "../../Common/Loading";

export const Permission = ({
  updateRolePermission,
  roles,
  roleData,
  editRolePermission,
  setVisible,
}) => {
  const [loading, setLoading] = useState(false);
  const [availablePermission, setAvailablePermission] = useState([]);
  const [addedPermission, setAddedPermission] = useState([
    ...roleData.permissions,
  ]);

  const [allPermission, setAllPermission] = useState([]);
  useEffect(() => {
    getAvailablePermission();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    checkAvailablePermission(allPermission);
    // eslint-disable-next-line
  }, [addedPermission]);

  const getAvailablePermission = async () => {
    setLoading(true);
    const { data } = await axios.get("/global/permission");
    setLoading(false);
    setAllPermission(data);
    checkAvailablePermission(data);
  };
  const checkAvailablePermission = async (data) => {
    const difference = await data.filter((list) => {
      let tempAddedPermission = [...roleData.permissions, ...addedPermission];
      return !tempAddedPermission.some((el) => {
        return el.name === list.name;
      });
    });
    setAvailablePermission(difference);
  };

  const addEmptyPermission = () => {
    setAddedPermission([
      ...addedPermission,
      {
        name: availablePermission[0].name,
        view: false,
        add: false,
        edit: false,
        delete: false,
        roleId: roleData.id,
      },
    ]);
  };

  const handleRowChange = (type, value, index) => {
    let temp = [...addedPermission];
    temp[index][type] = value;
    setAddedPermission(temp);
  };

  const handlePermissionRemove = (index) => {
    let temp = [...addedPermission];
    const tempAddedPermission = [
      ...availablePermission,
      { name: temp[index].name },
    ];
    setAvailablePermission(tempAddedPermission);

    temp.splice(index, 1);
    setAddedPermission(temp);
  };
  const handleSubmit = async () => {
    const result = await updateRolePermission(addedPermission, roleData.id);
    result && setVisible(false);
  };

  return (
    <Loading loading={roles.loading || loading}>
      {addedPermission.map((permission, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {editRolePermission ? (
              <Select
                showSearch
                value={permission.name}
                style={{ minWidth: "160px" }}
                onChange={(e) => handleRowChange("name", e, index)}
              >
                {availablePermission.map((el, i) => {
                  return (
                    <Select.Option value={el.name} key={i}>
                      {el.name}
                    </Select.Option>
                  );
                })}
              </Select>
            ) : (
              <div style={{ minWidth: "160px" }}>{permission.name}</div>
            )}

            <div style={{ display: "flex", gap: "5px" }}>
              View:
              <Checkbox
                onChange={(e) => {
                  if (!editRolePermission) return;
                  handleRowChange("view", e.target.checked, index);
                }}
                checked={permission.view}
              />
            </div>

            <div style={{ display: "flex", gap: "5px" }}>
              Add:
              <Checkbox
                onChange={(e) => {
                  if (!editRolePermission) return;
                  handleRowChange("add", e.target.checked, index);
                }}
                checked={permission.add}
              />
            </div>

            <div style={{ display: "flex", gap: "5px" }}>
              Edit:
              <Checkbox
                onChange={(e) => {
                  if (!editRolePermission) return;
                  handleRowChange("edit", e.target.checked, index);
                }}
                checked={permission.edit}
              />
            </div>

            <div style={{ display: "flex", gap: "5px" }}>
              Delete:
              <Checkbox
                onChange={(e) => {
                  if (!editRolePermission) return;
                  handleRowChange("delete", e.target.checked, index);
                }}
                checked={permission.delete}
              />
            </div>
            {editRolePermission && (
              <DeleteOutlined
                style={{
                  marginTop: "5px",
                  color: editRolePermission ? "black" : "grey",
                  cursor: editRolePermission ? "pointer" : "not-allowed",
                }}
                onClick={() => {
                  editRolePermission && handlePermissionRemove(index);
                }}
              />
            )}
          </div>
        );
      })}
      {editRolePermission && (
        <>
          <Button
            type="dashed"
            onClick={addEmptyPermission}
            block
            icon={<PlusOutlined />}
            style={{ marginTop: "20px" }}
            disabled={availablePermission.length === 0}
          >
            Add Permission
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
              disabled={addedPermission.length === 0}
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
          </div>{" "}
        </>
      )}
    </Loading>
  );
};

const mapStateToProps = (state) => ({ roles: state.roles });
const mapDispatchToProps = { updateRolePermission };

export default connect(mapStateToProps, mapDispatchToProps)(Permission);
