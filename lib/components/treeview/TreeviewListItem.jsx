import TreeviewFolder from "./TreeviewFolder";
import TreeviewLeaf from "./TreeviewLeaf";

const TreeviewListItem = ({ node }) => {
  if (node.children) {
    return <TreeviewFolder node={node} />;
  } else {
    return <TreeviewLeaf node={node} />;
  }
};

export default TreeviewListItem;
