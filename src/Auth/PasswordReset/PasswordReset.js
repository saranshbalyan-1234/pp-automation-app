import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { Link, useNavigate, useParams, Navigate,useLocation } from "react-router-dom";
import { resetPassword } from "../../Redux/Actions/auth";
import { connect } from "react-redux";
import { StyledWrapper } from "../style";
import Loading from "../../Components/Common/Loading";
import AnimatePage from "../../Components/Common/AnimatePage";
const PasswordReset = ({user}) => {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const onRegister = async () => {
    setLoading(true);
    (await resetPassword(token, password)) && navigate("/signin");
    setLoading(false);
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 28,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 5,
      },
    },
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
                  // initialValues={{ email }}
                  name="reset-password"
                  onFinish={onRegister}
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      showCount
                      maxLength={15}
                      name="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password showCount maxLength={15} />
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginRight: "20px" }}
                    >
                      Reset Password
                    </Button>
                    Or <Link to="/signin">Login now!</Link>
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
