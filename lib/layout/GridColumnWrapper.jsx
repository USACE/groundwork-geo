import styled from "styled-components";
import React from "react";

const RawGridColumnWrapper = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const GridColumnWrapper = styled(RawGridColumnWrapper)`
  position: relative;
  height: 100%;
  ${(props) => (props.width ? `width: ${props.width}px;` : "")}
`;

export default GridColumnWrapper;
