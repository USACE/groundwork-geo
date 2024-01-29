import { useConnect } from "redux-bundler-hook";
import ToolbarButton from "../components/toolbar/ToolbarButton";
import { VscZoomIn } from "react-icons/vsc";

const ZoomInButton = ({ label = "Zoom In" }) => {
  const { doGlobeZoomIn: zoomIn } = useConnect("doGlobeZoomIn");
  return (
    <ToolbarButton onClick={zoomIn}>
      <VscZoomIn />
      {label}
    </ToolbarButton>
  );
};

export default ZoomInButton;
export { ZoomInButton };
