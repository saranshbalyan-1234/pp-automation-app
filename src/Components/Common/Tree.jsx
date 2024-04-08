import React, { useState } from "react";
import { Tree } from "antd";
import Search from "./Search";
import { FolderOpenOutlined } from "@ant-design/icons";
const { DirectoryTree } = Tree;

const CustomTree = () => {
  const [treeData, setTreeData] = useState([
    {
      title: "parent 0",
      key: "0-0",
      icon: <FolderOpenOutlined />,
      children: [
        {
          title: "leaf 0-0",
          key: "0-0-0",
          isLeaf: true,
        },
        {
          title: "leaf 0-1",
          key: "0-0-1",
          isLeaf: true,
        },
      ],
    },
    {
      title: "parent 1",
      key: "0-1",
      icon: <FolderOpenOutlined />,
      children: [
        {
          title: "leaf 1-0",
          key: "0-1-0",
          isLeaf: true,
        },
        {
          title: "leaf 1-1",
          key: "0-1-1",
          isLeaf: true,
        },
      ],
    },
  ]);
  const [filteredData, setFilteredData] = useState(treeData);
  const onSelect = (keys, info) => {};

  const onExpand = (keys, info) => {};

  const searchTree = (e) => {
    let value = e.target.value;
    const temp = treeData.filter((parent) => {
      return (
        parent.title.includes(value) ||
        parent.children?.some((child) => {
          return child.title.includes(value);
        })
      );
    });
    setFilteredData(temp);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Search onSearch={searchTree} placeholder="Seach by Name" />
      <DirectoryTree
        multiple
        // defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={filteredData}
      />
    </div>
  );
};
export default CustomTree;
