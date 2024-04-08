import React, { useState } from "react";
import { connect } from "react-redux";
import {
  LogoutOutlined,
  EditOutlined,
  DownloadOutlined,
  CaretDownOutlined,InfoCircleOutlined 
} from "@ant-design/icons";
import { BiSupport } from "react-icons/bi";
import {
  Avatar,
  Dropdown,

} from "antd";
import { logout } from "../../../Redux/Actions/auth";
import { Link } from "react-router-dom";
import { handleAvatarInitials } from "../../Common/Avatar";
import DownloadAppModal from "../../../Views/DownloadAppModal";
const ProfileMenu = ({ logout, user }) => {
  const [downloadAppModal, setDownloadAppModal] = useState(false);

  const items = [
        {
      label: (
        <Link to="/about">
          <InfoCircleOutlined  style={{ marginRight: "5px" }} /> About
        </Link>
      ),
      key: "about",
    },
    { 
      label: (
        <div
          onClick={() => {
            setDownloadAppModal(true);
          }}
        >
          <DownloadOutlined style={{ marginRight: "5px" }} /> Download App
        </div>
      ),
      key: "download",
    },

    {
      label: (
        <Link to="/documentation">
          <BiSupport style={{ marginRight: "5px" }} /> Documentation
        </Link>
      ),
      key: "documentation",
    },
 
    {
      label: (
        <Link to="/settings/profile">
          <EditOutlined style={{ marginRight: "5px" }} />
          Settings
        </Link>
      ),
      key: "settings",
    },

    {
      label: (
        <>
          <LogoutOutlined style={{ marginRight: "5px" }} /> Logout
        </>
      ),
      key: "logout",
      onClick: logout,
    },
  ];

  // const notificationMenu = (
  //   <Menu
  //     items={[
  //       {
  //         label: (
  //           <div style={{ width: "400px" }}>
  //             <Badge.Ribbon text="TestCase">
  //               <div style={{ paddingRight: "70px" }}>
  //                 saransh created a new test case, with name how are you, please
  //                 have a look
  //               </div>
  //             </Badge.Ribbon>
  //           </div>
  //         ),
  //         key: "1",
  //       },
  //       {
  //         label: (
  //           <div style={{ width: "400px" }}>
  //             <Badge.Ribbon text="TestCase" color="red">
  //               <div style={{ paddingRight: "70px" }}>
  //                 saransh created a new test case, with name how are you, please
  //                 have a look
  //               </div>
  //             </Badge.Ribbon>
  //           </div>
  //         ),
  //         key: "2",
  //       },
  //     ]}
  //   />
  // );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          marginRight: "20px",
          marginBottom: "-10px",
          cursor: "pointer",
        }}
      >
        {/* <Dropdown overlay={notificationMenu} trigger={["hover"]}>
          <Badge count={1} overflowCount={9}>
            <BellOutlined style={{ color: "white", fontSize: "20px" }} />
          </Badge>
        </Dropdown> */}
      </div>
      <Dropdown menu={{ items }} trigger={["hover"]}>
        <div
          className="row profileMenu"
          style={{ alignItems: "center", cursor: "pointer", color: "white" }}
        >
          {user.profileImage ? (
            <Avatar
              src={"data:image/jpeg;base64," + user.profileImage}
              size={28}
              style={{
                backgroundColor: "white",
                color: "#001529",
                cursor: "pointer",
              }}
            >
              <div style={{ marginTop: "-1px", textTransform: "uppercase" }}>
                {handleAvatarInitials(user)}
              </div>
            </Avatar>
          ) : (
            <Avatar
              size={28}
              style={{
                backgroundColor: "white",
                color: "#001529",
                cursor: "pointer",
              }}
            >
              <div style={{ marginTop: "-1px", textTransform: "uppercase" }}>
                {handleAvatarInitials(user)}
              </div>
            </Avatar>
          )}{" "}
          <div>{user.name}</div>
          <CaretDownOutlined />
        </div>
      </Dropdown>
      {downloadAppModal && (
        <DownloadAppModal
          visible={downloadAppModal}
          setVisible={setDownloadAppModal}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  images: state.image,
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
