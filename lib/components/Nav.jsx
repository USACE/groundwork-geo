import styled from "styled-components";
import React from "react";
// import Popover from "./Popover";

const RawNavItem = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
  // return (
  //   <Popover preferredPosition={"right-center"} delay={200}>
  //     <Popover.Target>
  //       <button {...props}>{children}</button>
  //     </Popover.Target>
  //     <Popover.Content>
  //       <div style={{ color: "#fff" }}>Content</div>
  //     </Popover.Content>
  //   </Popover>
  // );
};

const NavItem = styled(RawNavItem)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.sidebar.background};
  border: 0px solid #ddd;
  border-radius: 0px;
  padding: 8px 8px;
  height: 60px;
  width: 100%;
  color: ${(props) =>
    props.selected
      ? props.theme.colors.sidebar.selectedForeground
      : props.theme.colors.sidebar.foreground};
  cursor: pointer;
  transition: 0.1s ease;
  border-left: 2px solid
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

const RawNav = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const Nav = styled(RawNav)`
  height: 100%;
  width: 60px;
  background-color: ${(props) => props.theme.colors.sidebar.background};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export { Nav, NavItem };
