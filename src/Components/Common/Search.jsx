import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
export default function CustomSearch({
  placeholder = "Search",
  width = "250px",
  onSearch = () => {},
}) {
  const handleSearch = debounce((e) => {
    onSearch(e);
  }, 300);
  return (
    <StyledSearch width={width}>
      <Input
        allowClear
        onChange={handleSearch}
        placeholder={placeholder}
        prefix={<SearchOutlined style={{ marginRight: "5px" }} />}
      />
    </StyledSearch>
  );
}
const StyledSearch = styled.div`
  width: ${({ width }) => width};
  max-width: ${({ width }) => width};
  cursor: pointer;
  transition: width 0.5s;

  .ant-input-affix-wrapper {
    border-bottom: 1px solid #d9d9d9 !important;
    border-top: 0px !important;
    border-left: 0px !important;
    border-right: 0px !important;
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }
`;
