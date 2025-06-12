import styled from "styled-components";
import React from "react";

const RawActivityItem = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

const ActivityItem = styled(RawActivityItem)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.sidebar.background};
  border: 0px solid #ddd;
  border-radius: 0px;
  padding: 8px 8px;
  height: 35px;
  width: 35px;
  color: ${(props) =>
    props.selected
      ? props.theme.colors.sidebar.selectedForeground
      : props.theme.colors.sidebar.foreground};
  cursor: pointer;
  transition: 0.1s ease;
  border-bottom: 2px solid
    ${(props) =>
    props.selected
      ? props.theme.colors.sidebar.selectedForeground
      : "transparent"};

  &:hover {
    color: ${(props) => props.theme.colors.sidebar.selectedForeground};
  }

  &:focus {
    outline: none;
  }
`;

const RawActivityBar = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const ActivityBar = styled(RawActivityBar)`
  position: absolute;
  width: 100%;
  background-color: ${(props) => props.theme.colors.sidebar.background};
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

export { ActivityBar, ActivityItem };