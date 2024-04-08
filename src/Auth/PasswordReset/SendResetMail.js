import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {  useNavigate,Navigate,useLocation } from "react-router-dom";
import { StyledWrapper } from "../style";
import { connect } from "react-redux";
import { sendResetPasswordMail } from "../../Redux/Actions/auth";
import Loading from "../../Components/Common/Loading";
import AnimatePage from "../../Components/Common/AnimatePage";
const SendResetMail = ({ sendResetPasswordMail,user }) => {
  const navigate = useNavigate();
    const location = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);

    await sendResetPasswordMail({ email: email });
    setLoading(false);
  };

    if (user) return <Navigate
      to={{
        pathname: "/dashboard",
        state: {
          from: location.pathname,
        },
      }}
    />
  
  return (
    <StyledWrapper>
      <div className="outsideApp">
        <Loading loading={loading}>
          <AnimatePage>
            <Card
              bordered
              style={{
                minWidth: 400,
              }}
            >
              <center>
                <img
                  alt="logo"
                  src="https://qualitycuredmain.s3.ap-south-1.amazonaws.com/Public/Logo/logo2.svg"
                  style={{ height: 100, marginBottom: 30, width: 300 }}
                />

                <Form
                  name="normal_login"
                  initialValues={{ remember: true }}
                  onFinish={handleReset}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your Email!" },
                    ]}
                  >
                    <Input
                      type="email"
                      prefix={<UserOutlined />}
                      placeholder="Email"
                      name="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginRight: "10px" }}
                    >
                      Reset Password
                    </Button>{" "}
                    Or
                    <Button
                      onClick={() => {
                        navigate("/signin");
                      }}
                      htmlType="button"
                      style={{ marginLeft: "10px" }}
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </center>
            </Card>
          </AnimatePage>
        </Loading>
      </div>
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = { sendResetPasswordMail };

export default connect(mapStateToProps, mapDispatchToProps)(SendResetMail);
