import styled from "styled-components";
import React from "react";

const RawGrid = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const Grid = styled(RawGrid)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  height: 100%;
`;

export default Grid;
