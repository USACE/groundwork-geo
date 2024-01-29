import { useConnect } from "redux-bundler-hook";
import ToolbarButton from "../components/toolbar/ToolbarButton";
import { VscHome } from "react-icons/vsc";

const ZoomHomeButton = ({ label = "Home" }) => {
  const { doGlobeFlyToInitalPosition } = useConnect(
    "doGlobeFlyToInitalPosition"
  );
  return (
    <ToolbarButton onClick={doGlobeFlyToInitalPosition}>
      <VscHome />
      {label}
    </ToolbarButton>
  );
};

export default ZoomHomeButton;
export { ZoomHomeButton };
