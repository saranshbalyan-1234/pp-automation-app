import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertOutlined,
  SettingOutlined,
  AimOutlined,
  FileSearchOutlined,
  BugOutlined,
} from "@ant-design/icons";
export default function Documentation() {
  const navigate = useNavigate();

  const data = [
    {
      title: (
        <div>
          <AlertOutlined style={{ marginRight: 10, fontSize: 25 }} />
          Basic Product
        </div>
      ),
      link: "/documentation/basic",
      description: (
        <>
          <div>Know basics about our product.</div>
          <br />
          <div>How it works and some basic terminology</div>
        </>
      ),
    },
    {
      title: (
        <div>
          <SettingOutlined style={{ marginRight: 10, fontSize: 25 }} />
          Setting
        </div>
      ),
      link: "/documentation/settings",
      description: (
        <>
          <div>Know about user Settings</div>
          <br />
          <div>Customer, User, Roles, Permissions</div>
        </>
      ),
    },
    {
      title: (
        <div>
          <AimOutlined style={{ marginRight: 10, fontSize: 25 }} />
          Execution
        </div>
      ),
      link: "/documentation/execution",
      description: (
        <>
          <div>Everything about Executions!</div>
          <br />
          <div>Executions and Histories</div>
        </>
      ),
    },
    {
      title: (
        <div>
          <FileSearchOutlined style={{ marginRight: 10, fontSize: 25 }} />
          Action Keywords
        </div>
      ),
      link: "/documentation/action-keywords",
      description: (
        <>
          <div>We support over 100 Action Keywords.</div>
          <br />
          <div>Know each one of them in detail!</div>
        </>
      ),
    },
    {
      title: (
        <div>
          <BugOutlined style={{ marginRight: 10, fontSize: 25 }} /> Common
          Errors
        </div>
      ),
      link: "/documentation/common-errors",
      description: (
        <>
          <div>Complete list of all the common errors.</div>
          <br />
          <div>Explanation and solution!</div>
        </>
      ),
    },
  ];
  return (
    <div style={{ display: "flex", gap: 30, paddingTop: 40, flexWrap: "wrap" }}>
      {data.map((el) => {
        return (
          <Card
            bordered
            hoverable
            onClick={() => {
              navigate(el.link);
            }}
            style={{ width: 400 }}
          >
            <Card.Meta title={el.title} description={el.description} />
          </Card>
        );
      })}
    </div>
  );
}
