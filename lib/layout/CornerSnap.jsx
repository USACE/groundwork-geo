import styled from "styled-components";
import React from "react";

const RawCornerSnap = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const CornerSnap = styled(RawCornerSnap)`
  position: absolute;
  ${(props) => {
    switch (props.corner) {
      case "top-left":
        return "top: 0; left: 0;";
      case "top-right":
        return "top: 0; right: 0;";
      case "bottom-left":
        return "bottom: 0; left: 0;";
      case "bottom-right":
        return "bottom: 0; right: 0;";
    }
  }}
`;

export default CornerSnap;
