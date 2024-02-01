import styled from "styled-components";
import TreeviewList from "./TreeviewList";

const Treeview = styled(({ data = [], ...props }) => {
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
