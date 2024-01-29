import { Sidebar, LayerTree, BasemapPicker } from "../lib";

export default function LeftSidebar() {
  return <Sidebar tools={[LayerTree, BasemapPicker]} />;
}
