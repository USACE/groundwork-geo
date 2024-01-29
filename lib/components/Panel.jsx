import styled from "styled-components";
import React, { useEffect } from "react";
import { useConnect } from "redux-bundler-hook";
import makeResizable from "../utils/makeResizable";

const PanelBody = styled.div`
  background-color: ${(props) => props.theme.colors.panel.background};
  color: ${(props) => props.theme.colors.panel.foreground};
  height: 100%;
  --resizable-width: 300px;
  width: var(--resizable-width);
`;

const Handle = styled.div`
  float: right;
  height: 100%;
  width: 1px;
  background-color: transparent;
  z-index: 1;
  transition: width 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.panel.resizeHandle};
    width: 6px;
  }

  &::after {
    content: "";
    width: 9px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin-left: -4px;
    background-color: transparent;
    cursor: ew-resize;
    z-index: 2;
  }
`;

const Panel = (props) => {
  const panelRef = React.useRef(null);
  const handleRef = React.useRef(null);
  const { panelSizeWidth, doPanelSizeSetWidth } = useConnect(
    "selectPanelSizeWidth",
    "doPanelSizeSetWidth"
  );

  useEffect(() => {
    if (!panelRef.current || !handleRef.current) return;
    makeResizable(
      panelRef.current,
      handleRef.current,
      panelSizeWidth,
      doPanelSizeSetWidth
    );
  }, [handleRef.current]);

  return (
    <PanelBody {...props} ref={panelRef}>
      <Handle ref={handleRef} />
      {props.children}
    </PanelBody>
  );
};

export { Panel };
