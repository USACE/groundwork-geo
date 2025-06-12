import styled from "styled-components";
import { MdOutlineCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { useState, useEffect } from "react";

const TreeviewLeaf = styled(({ node, onSelect, ...props }) => {
  const [selected, setSelected] = useState(node.layer.show);

  const handleSelect = () => {
    if (selected) {
      node.layer.setStyle(null)
    } else {
      node.layer.setStyle(node.style)
    }
    setSelected(!selected)
  };

  const CustomIcon = node.icon;

  return (
    <div onClick={handleSelect} {...props}>
      {selected ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
      {CustomIcon ? <CustomIcon color="#caca" /> : null}
      {node.name}
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

export default TreeviewLeaf;
export { TreeviewLeaf };
