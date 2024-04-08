import React from "react";
import { Routes, Route } from "react-router-dom";
import AllProject from "./AllProject";
import ProjectDetails from "./ProjectDetails";
export default function index() {
  return (
    <Routes>
      <Route path="/" element={<AllProject />} />
      <Route path="/:projectId/details" element={<ProjectDetails />} />
    </Routes>
  );
}
