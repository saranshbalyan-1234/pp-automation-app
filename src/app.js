import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import "./global.css";
import Register from "./Auth/Register";
import Routess from "./Routess";
import { Provider } from "react-redux";
import { store, persister } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import SignIn from "./Auth/SignIn";
import SendResetMail from "./Auth/PasswordReset/SendResetMail";
import Test from "./Test";
import VerifyEmail from "./Auth/VerifyEmail";
import PasswordReset from "./Auth/PasswordReset/PasswordReset";
import AboutUs from "./Views/About";

export default function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_PATH}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <Routes>
            <Route exact path="test" element={<Test />} />
            <Route path="/about" element={<AboutUs />} />
            
            <Route exact path="/" element={<Navigate to={`/dashboard`} />}></Route>
            <Route exact path="signin" element={<SignIn />} />
            <Route exact path="register" element={<Register />} />
            <Route
              exact
              path="auth/verify-user/:token"
              element={<VerifyEmail />}
            />
            <Route
              exact
              path="auth/verify-customer/:token"
              element={<VerifyEmail />}
            />
            <Route
              exact
              path="reset-password/send-mail"
              element={<SendResetMail />}
            />
            <Route
              exact
              path="reset-password/:token"
              element={<PasswordReset />}
            />


            <Route path="/*" element={<Routess />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}
