import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
const config = {
  data: [],
  xField: "name",
  yField: "Total",
  label: {
    position: "middle",
    // 'top', 'bottom', 'middle',
    style: {
      fill: "white",
      opacity: 0.7,
    },
  },

  xAxis: {
    label: {
      style: {
        lineWidth: 2,
        fill: "black",
      },
    },
  },
  yAxis: {
    label: {
      style: {
        lineWidth: 2,
        fill: "black",
      },
    },
  },
  color: "#001529",
};
export default function ColumnGraph({ data = [], height = 250, width = 350 }) {
  const [graph, setGraph] = useState({ ...config });
  useEffect(() => {
    setGraph({ ...config, data });
  }, [data]);

  return (
    <div style={{ height, width }}>
      {data.length > 0 && <Column {...graph} />}
    </div>
  );
}
