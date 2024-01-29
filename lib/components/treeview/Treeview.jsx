import { useState } from "react";
import styled from "styled-components";
import TreeviewList from "./TreeviewList";
import { DatabaseIcon, RasterIcon } from "@corpsmap/map-icons-react";

const treeData = [
  {
    id: 1,
    label: "Root",
    children: [
      {
        id: 2,
        parentId: 1,
        label: "Child 1",
        children: [
          {
            id: 3,
            parentId: 2,
            label: "Grandchild 1",
            icon: DatabaseIcon,
            selected: true,
            focused: true,
          },
          {
            id: 4,
            parentId: 2,
            label: "Grandchild 2",
            icon: RasterIcon,
            selected: false,
          },
        ],
      },
      {
        id: 5,
        parentId: 1,
        label: "Here we go",
        selected: false,
      },
    ],
  },
  {
    id: 6,
    label: "Another Root",
    children: [],
  },
];

const Treeview = styled(({ data = treeData, ...props }) => {
  return (
    <div {...props}>
      <TreeviewList nodes={data} />
    </div>
  );
})`
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.5rem;
  cursor: pointer;
  position: relative;
  z-index: 1;
`;

export default Treeview;
export { Treeview };
