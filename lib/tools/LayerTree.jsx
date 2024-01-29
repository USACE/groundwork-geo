import { ActivityItem } from "../components/ActivityBar";
import { Panel } from "../components/Panel";
import Treeview from "../components/treeview/Treeview";
import { VscLayers } from "react-icons/vsc";
import { useConnect } from "redux-bundler-hook";

const LayerTreeButton = ({ ...props }) => {
  return (
    <ActivityItem {...props}>
      <VscLayers size={32} />
    </ActivityItem>
  );
};

const LayerTreePanel = ({ children, ...props }) => {
  const { layers } = useConnect("selectLayers");
  return (
    <Panel {...props}>
      <Treeview data={layers} />
    </Panel>
  );
};

const LayerTree = {
  id: "layer-tree",
  Button: LayerTreeButton,
  Panel: LayerTreePanel,
};

export { LayerTreeButton, LayerTreePanel, LayerTree };
export default LayerTree;
