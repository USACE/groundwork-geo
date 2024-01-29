import { useConnect } from "redux-bundler-hook";
import ToolbarButton from "../components/toolbar/ToolbarButton";
import { VscArrowLeft } from "react-icons/vsc";

const ZoomPreviousButton = ({ label = "" }) => {
  const { globeCanFlyToPreviousPosition, doGlobeFlyToPreviousPosition } =
    useConnect(
      "selectGlobeCanFlyToPreviousPosition",
      "doGlobeFlyToPreviousPosition"
    );
  return (
    <ToolbarButton
      disabled={!globeCanFlyToPreviousPosition}
      onClick={doGlobeFlyToPreviousPosition}
    >
      <VscArrowLeft />
      {label}
    </ToolbarButton>
  );
};

export default ZoomPreviousButton;
export { ZoomPreviousButton };
