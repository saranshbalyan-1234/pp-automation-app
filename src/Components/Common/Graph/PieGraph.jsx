import React, { useState, useEffect } from "react";
import { Pie, G2 } from "@ant-design/plots";

const PieGraph = ({ data }) => {
  const config = {
    legend: true,
    appendPadding: 0,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
  };
  return <Pie {...config} />;
};
export default PieGraph;
