import styled from "styled-components";
import React from "react";

const RawGridColumn = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const GridColumn = styled(RawGridColumn)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default GridColumn;
