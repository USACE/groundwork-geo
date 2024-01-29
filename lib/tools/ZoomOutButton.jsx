import { useConnect } from "redux-bundler-hook";
import ToolbarButton from "../components/toolbar/ToolbarButton";
import { VscZoomOut } from "react-icons/vsc";

const ZoomOutButton = ({ label = "Zoom Out" }) => {
  const { doGlobeZoomOut: zoomOut } = useConnect("doGlobeZoomOut");
  return (
    <ToolbarButton onClick={zoomOut}>
      <VscZoomOut />
      {label}
    </ToolbarButton>
  );
};

export default ZoomOutButton;
export { ZoomOutButton };
