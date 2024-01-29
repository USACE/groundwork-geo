import styled from "styled-components";
import TreeviewListItem from "./TreeViewListItem";

const TreeviewList = styled(({ nodes, showBorder = false, ...props }) => {
  return (
    <div {...props}>
      {nodes.map((node) => {
        return <TreeviewListItem key={node.id} node={node} />;
      })}
    </div>
  );
})`
  padding-left: 0.5rem;
  ${(props) =>
    props.showBorder &&
    `border-left: 1px solid ${props.theme.colors.treeview.hierarchyBorder};`}
`;

export default TreeviewList;
