import React from "react";
import { HomeOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import { ImLocation } from "react-icons/im";
import styled from "styled-components";
export default function Container({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const breadcrumbNameMap = {
    "/setting": "Settings",
  };
  const renderTitle = () => {
    if (pathSnippets[0]) return pathSnippets[0].split("-").join(" ")
    else return "Nothing Here"
  }; 

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((value, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      {
        title: (
          <div
            style={{ textTransform: "capitalize" }}
          >
            {breadcrumbNameMap[url]?.split("-").join(" ") ||
              value?.split("-").join(" ")}
          </div>
        ),
        key: url,
      }
    );
  });

  const items = [
    {
      title: (
        <Link to="/dashboard">
          <HomeOutlined /> Home
        </Link>
      ),
      key: "home",
    },
  ].concat(extraBreadcrumbItems);

  const renderBack = () => {
    const locArray = location.pathname.split("/");

    if (locArray.length > 2 && locArray[2] !== "") {
      let name = "";
      if (locArray[1] === "reusable-process") {
        name = "Reusable Process";
      } else if (locArray[1] === "object-bank") {
        name = "Objects";
      } else if (locArray[1] === "test-case") {
        name = "Test Case";
      } else if (locArray[1] === "project") {
        name = "project";
      }
      if (name)
        return (
          <GoMainButton
            onClick={() => {
              navigate("/" + locArray[1]);
            }}
          >
            <LeftCircleOutlined />
            All {name}
          </GoMainButton>
        );
    }
  };
  return (
    <>
      <div>
        <PageHeader
          style={{ padding: "5px 15px 5px 15px", background: "#fff" }}
          onBack={() => window.history.back()}
          title={
            <div
              style={{
                textTransform: "capitalize",
                display: "flex",
                // marginTop: "-10px",
              }}
            >
              <div>{renderBack()}</div>
              <ImLocation style={{ marginRight: "3px", marginTop: "5px" }} />
              <div>{renderTitle()}</div>
            </div>
          }
          subTitle={
            <Breadcrumb items={items} />


          }
        // tags={<Tag color="blue">Sarance</Tag>}
        // extra={
        //   <div
        //     style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
        //   ></div>
        // }
        // avatar={{
        //   icon: <></>,
        // }}
        ></PageHeader>
      </div>

      <div
        id="custom-container"
        style={{
          padding: "0px 20px 20px 20px",
          minHeight: "calc(100vh - 120px)",
          marginTop: "10px",
          background: "#fff",
        }}
      >
        {children}
      </div>
    </>
  );
}

const GoMainButton = styled.div`
  background-color: rgb(229, 231, 235);
  border-radius: 15px;
  color: rgb(31, 63, 111);
  cursor: pointer;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
  font-size: 16px;
  span {
    color: rgb(31, 63, 111);
    margin-right: 5px;
  }
`;
