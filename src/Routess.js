import React from "react";
import Layout from "./Components/Layout";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./Redux/Actions/auth";
import ErrorPage from "./Views/ErrorPage";
import Setting from "./Components/Settings";
import Dashboard from "./Components/Dashboard";
import DocumentationRoutes from "./Views/Documentation/routes";
import Project from "./Components/Project";
import TestCase from "./Components/TestCase";
import ReusableProcess from "./Components/ReusableProcess";
import ObjectBank from "./Components/ObjectBank";
import { usePermission } from "./Utils/permission";
import ExecutionSuite from "./Components/ExecutionSuite";
function Routess({ user }) {
  const location = useLocation();
  const viewTestCasePermission = usePermission("Test Case", "view");
  const viewExecutionSuitePermission = usePermission("Execution Suite", "view");
  const viewReusableProcessPermission = usePermission("Reusable Process", "view");
  const viewObjectBankPermission = usePermission("Test Object", "view");
  const viewProjectPermission = usePermission("Project", "view");
  window.addEventListener("storage", function (event) {
    if (event.storageArea === sessionStorage) {
      alert("You tampered the session");
      sessionStorage.clear();
      window.location.href = "/pp-automation-app/signin";
    }
  });

  return user ? (
    <Layout
      viewTestCasePermission={viewTestCasePermission}
      viewReusableProcessPermission={viewReusableProcessPermission}
      viewObjectBankPermission={viewObjectBankPermission}
      viewProjectPermission={viewProjectPermission}
      viewExecutionSuitePermission={viewExecutionSuitePermission}
    >
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route
          exact
          path="/documentation/*"
          element={<DocumentationRoutes />}
        ></Route>
        <Route exact path="/settings/:tab" element={<Setting />}></Route>
        {viewProjectPermission && (
          <Route exact path="/project/*" element={<Project />}></Route>
        )}
        {viewTestCasePermission && (
          <Route exact path="/test-case/*" element={<TestCase />}></Route>
        )}
        {viewReusableProcessPermission && (
          <Route
            exact
            path="/reusable-process/*"
            element={<ReusableProcess />}
          ></Route>
        )}
        {viewExecutionSuitePermission && (
          <Route
            exact
            path="/execution-suite/*"
            element={<ExecutionSuite />}
          ></Route>
        )}

        {viewObjectBankPermission && (
          <Route exact path="/object-bank/*" element={<ObjectBank />}></Route>
        )}
        <Route
          exact
          path="*"
          element={
            <ErrorPage
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
            />
          }
        />
      </Routes>
    </Layout>
  ) : (
    <Navigate
      to={{
        pathname: "/signin",
        state: {
          from: location.pathname,
        },
      }}
    />
  );
}
const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Routess);
