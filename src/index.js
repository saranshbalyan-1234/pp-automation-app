import React from "react";
import { createRoot } from "react-dom/client";
import interceptor from "../src/Utils/interceptor";
import App from "./app";
import "react-quill/dist/quill.snow.css";
import ErrorBoundary from "./Components/Common/ErrorBoundary";
import { ConfigProvider } from 'antd'
const theme = {
    token: {
        // fontFamily: "'Montserrat', sans-serif",
        // fontSize: "1px"
    },
};

interceptor.setup();
const root = createRoot(document.getElementById("root"));
root.render(
    <ErrorBoundary>
        <ConfigProvider theme={theme}>
            <App />
        </ConfigProvider>
    </ErrorBoundary>);
