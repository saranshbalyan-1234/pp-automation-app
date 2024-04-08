import React, { useEffect, useState } from "react";
import { Avatar, Popover, Card, Badge } from "antd";
import { connect } from "react-redux";

const UserAvatar = ({
  userList,
  user,
  size = "small",
  self,
  showName = false,
}) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const temp = [...userList, { ...self, active: true }]?.find((el) => {
      return el.id === user;
    });
    temp?.id && setUserData(temp);
    // eslint-disable-next-line
  }, [userList, user]);

  const getUserData = () => {
    return (
      <Badge.Ribbon
        text={
          userData.deletedAt
            ? "Deleted"
            : userData.verifiedAt
            ? userData.active
              ? "Active"
              : "Inactive"
            : "Verification Pending"
        }
        style={{ marginTop: "-10px" }}
      >
        <Card.Meta
          style={{ minWidth: 250 }}
          title={
            <div
              style={{
                gap: "10px",
                flexWrap: "wrap",
                marginRight: 60,
              }}
            >
              <div>
                <b>User Details</b>
              </div>
              <div> Name: {userData.name}</div>
            </div>
          }
          description={<div>Email: {userData.email}</div>}
        />
      </Badge.Ribbon>
    );
  };
  if (!userData.id || !user) return;

  return (
    <>
      <Popover content={getUserData}>
        {userData.profileImage ? (
          <Avatar
            src={"data:image/jpeg;base64," + userData.profileImage}
            size={size}
            style={{
              backgroundColor: "#f56a00",
              cursor: "pointer",
            }}
          >
            <div style={{ marginTop: "-1px", textTransform: "uppercase" }}>
              {handleAvatarInitials(user)}
            </div>
          </Avatar>
        ) : (
          <Avatar
            size={size}
            style={{
              backgroundColor: "#f56a00",
              cursor: "pointer",
            }}
          >
            <div style={{ marginTop: "-1px", textTransform: "uppercase" }}>
              {userData.id && handleAvatarInitials(userData)}
            </div>
          </Avatar>
        )}
      </Popover>
      {showName && " " + userData.name}
    </>
  );
};
export const handleAvatarInitials = (user) => {
  const temp = user.name?.split(" ");
  const initials = temp
    ?.map((el) => {
      return el[0];
    })
    .join("");

  return initials;
};

const mapStateToProps = (state) => ({
  userList: state.team.data,
  self: state.auth.user,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
