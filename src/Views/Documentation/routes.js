import React from "react";
import { Routes, Route } from "react-router-dom";
import Documentaion from "./index";
import Basic from "./Basic";
import Setting from "./Setting";
import Errors from "./Error";
export default function DocumentationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Documentaion />} />
      <Route path="/basic" element={<Basic />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/common-errors" element={<Errors />} />
    </Routes>
  );
}
