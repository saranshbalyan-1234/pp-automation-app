import { StyledLayout } from "./style";
import { FloatButton } from "antd";
import { Layout } from "antd";
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Container from "./Container";
const { Content } = Layout;
export default function LayOut({
  children,
  viewTestCasePermission,
  viewExecutionSuitePermission,
  viewReusableProcessPermission,
  viewObjectBankPermission,
  viewProjectPermission,
}) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <StyledLayout>
      <Layout>
        <Layout style={{ maxHeight: "100vh" }}>
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            viewTestCasePermission={viewTestCasePermission}
            viewReusableProcessPermission={viewReusableProcessPermission}
            viewObjectBankPermission={viewObjectBankPermission}
            viewProjectPermission={viewProjectPermission}
            viewExecutionSuitePermission={viewExecutionSuitePermission}
          />
          <div
            id="right_container"
            style={{
              width: "100%",
              minHeight: "100vh",
              overflow: "scroll",
            }}
          >
            <Header setCollapsed={setCollapsed} collapsed={collapsed} />
            <Content
              style={{
                margin: "16px 16px 0",
              }}
            >
              <Container children={children} />
              <Footer />
            </Content>
            <FloatButton.BackTop />
          </div>
        </Layout>
      </Layout>
    </StyledLayout>
  );
}
