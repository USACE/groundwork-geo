import styled from "styled-components";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";

import { useState } from "react";
import TreeviewList from "./TreeviewList";

const TreeviewFolder = styled(({ node, ...props }) => {
  const [expanded, setExpanded] = useState(true);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div onClick={handleExpand} {...props}>
        {expanded ? <VscChevronDown /> : <VscChevronRight />} {node.name}
      </div>
      {expanded && node.children && (
        <TreeviewList nodes={node.children} showBorder />
      )}
    </div>
  );
})`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 0.2rem;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    height: 1.3rem;
    width: 100%;
    clear: both;
    z-index: -1;
  }

  &:hover {
    color: #fff;
  }

  &:hover:before {
    background-color: ${(props) => props.theme.colors.treeview.backgroundHover};
  }
`;

export default TreeviewFolder;
