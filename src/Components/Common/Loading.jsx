import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ErrorBoundary from './ErrorBoundary'
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function Loading({ loading = true, children, tip }) {
  return (
    <Spin spinning={loading} indicator={loadingIcon} tip={tip}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Spin>
  );
}
