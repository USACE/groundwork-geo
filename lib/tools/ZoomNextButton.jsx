import { useConnect } from "redux-bundler-hook";
import ToolbarButton from "../components/toolbar/ToolbarButton";
import { VscArrowRight } from "react-icons/vsc";

const ZoomNextButton = ({ label = "" }) => {
  const { globeCanFlyToForwardPosition, doGlobeFlyToForwardPosition } =
    useConnect(
      "selectGlobeCanFlyToForwardPosition",
      "doGlobeFlyToForwardPosition"
    );
  return (
    <ToolbarButton
      disabled={!globeCanFlyToForwardPosition}
      onClick={doGlobeFlyToForwardPosition}
    >
      <VscArrowRight />
      {label}
    </ToolbarButton>
  );
};

export default ZoomNextButton;
export { ZoomNextButton };
