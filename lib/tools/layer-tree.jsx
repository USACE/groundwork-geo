import { ActivityItem as ToolbarButton } from "../components/toolbar/activity-bar";
import { Panel } from "../components/panel";
import Treeview from "../components/treeview/Treeview"
import { VscLayers } from "react-icons/vsc";
import { useConnect } from "redux-bundler-hook";

const LayerTreeButton = ({ ...props }) => {
    return (
        <ToolbarButton {...props}>
            <VscLayers size={32} />
        </ToolbarButton>
    );
};

const LayerTreePanel = ({ children, ...props }) => {
    const { layers, maps } = useConnect("selectLayers", "selectMaps");
    let map = maps['toolbar']
    console.log(map?.getLayers())
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