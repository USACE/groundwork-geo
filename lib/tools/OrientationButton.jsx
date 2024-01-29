import { useConnect } from "redux-bundler-hook";
import ToolbarButton from "../components/toolbar/ToolbarButton";
import { TbNavigationNorth } from "react-icons/tb";

const OrientationButton = ({ label = "" }) => {
  const { doGlobeOrientNorth } = useConnect("doGlobeOrientNorth");
  return (
    <ToolbarButton
      onClick={doGlobeOrientNorth}
      title="Re-orient so north is up"
    >
      <TbNavigationNorth />
      {label}
    </ToolbarButton>
  );
};

export default OrientationButton;
export { OrientationButton };
