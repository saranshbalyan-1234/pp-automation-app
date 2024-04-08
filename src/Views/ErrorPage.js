import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import AnimatePage from "../Components/Common/AnimatePage";
export default function ErrorPage({ status, title, subTitle, showBtn = true }) {
  const navigate = useNavigate();
  return (
    <div style={{height:"calc(100vh - 100px)",display:'flex',justifyContent:'center',alignItems:"center"}}>
    <AnimatePage>
      <Result
        style={{ paddingTop: "10px" }}
        status={status}
        title={title}
        subTitle={subTitle}
        extra={
          showBtn && (
            <Button
              onClick={() => {
                navigate("/dashboard");
              }}
              type="primary"
            >
              Back Home
            </Button>
          )
        }
      />
      </AnimatePage>
    </div>
  );
}
