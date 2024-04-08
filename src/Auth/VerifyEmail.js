import React, { useEffect, useState } from "react";
import { useLocation, useNavigate ,Navigate} from "react-router-dom";
import axios from "axios";
import { getError } from "../Utils/error";
import { message } from "antd";
import ErrorPage from "../Views/ErrorPage";
import Lottie from 'lottie-react';
import { connect } from "react-redux";
import verifyingAnimation from '../assets/animations/verifying.json';
function VerifyEmail({user}) {
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;
    message.info("Verifying, Please wait!")
    axios
      .get(location.pathname)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        setError(err.error);
        getError(err);
      });
  }, [location.pathname, navigate]);

     if (user) return <Navigate
      to={{
        pathname: "/dashboard",
        state: {
          from: location.pathname,
        },
      }}
    />
  
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        paddingTop: 30,
      }}
    >
      <center>
        {error ? (
          <ErrorPage
            status={"403"}
            title={error}
            subTitle={"Please contact your Administrator!"}
            showBtn={false}
          />
        ) : (
          <>
            <Lottie animationData={verifyingAnimation} />
          </>
        )}
      </center>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});


export default connect(mapStateToProps)(VerifyEmail);