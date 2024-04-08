import React, { useState } from "react";
import { Collapse, Space } from "antd";
import Search from "../../Components/Common/Search";
import ReactDOMServer from "react-dom/server";
import { Link } from "react-router-dom";

const { Panel } = Collapse;
export default function QuestionAns({ data = [] }) {
  const [state, setState] = useState(data);

  const handleSearch = (e) => {
    let value = e.target.value;
    const temp = data.filter((el) => {
      const htmlStr = ReactDOMServer.renderToString(el.data);
      return (
        el.header.toLowerCase().includes(value.toLowerCase()) ||
        htmlStr.toLowerCase().includes(value.toLowerCase())
      );
    });

    setState(temp);
  };
  return (
    <Space direction="vertical" style={{ minWidth: "100%", marginTop: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <Search onSearch={handleSearch} placeholder="Seach by keyword" />
      </div>

      {state.map((el, i) => {
        return (
          <Collapse collapsible="header" defaultActiveKey={[]}>
            <Panel header={el.header} key={"header_" + i}>
              <div style={{ padding: "0px 20px 10px 20px" }}>{el.data}</div>
              {el.linkPath && el.linkName && <Link to={el.linkPath}>Go To {el.linkName}</Link>}
            </Panel>
          </Collapse>
        );
      })}
    </Space>
  );
}
