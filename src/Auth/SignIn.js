import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate,Navigate,useLocation } from "react-router-dom";
import { StyledWrapper } from "./style";
import { connect } from "react-redux";
import { signIn, logout } from "../Redux/Actions/auth";
import Loading from "../Components/Common/Loading";
import AnimatePage from "../Components/Common/AnimatePage";
const SignIn = ({ loading, signIn, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let object = {};
    object[name] = value;
    setDetails({ ...details, ...object });
  };

  const handleSignIn = async () => {
    const result = await signIn(details);
    result && navigate("/dashboard");
  };
  const handleRememberMe = (e) => {
    setDetails({ ...details, rememberMe: e.target.checked });
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
              // title="Login"
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
                  style={{ minWidth: 350 }}
                  initialValues={{ remember: false }}
                  onFinish={handleSignIn}
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
                        handleDetails(e);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input.Password
                      showCount
                      maxLength={15}
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => {
                        handleDetails(e);
                      }}
                      autoComplete="on"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox onChange={handleRememberMe}>
                        Remember me
                      </Checkbox>
                    </Form.Item>

                    <Link to="/reset-password/send-mail">Forgot password!</Link>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginRight: "20px" }}
                    >
                      Log in
                    </Button>
                    Or <Link to="/register">Register now!</Link>
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
  loading: state.auth.loading,
  user: state.auth.user
});

const mapDispatchToProps = { signIn, logout };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
