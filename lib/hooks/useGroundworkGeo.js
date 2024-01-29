import { useConnect } from "redux-bundler-hook";

const useGroundworkGeo = () => {
  const {
    globeViewer: globe,
    doGlobeFlyTo: flyTo,
    doGlobeZoomIn: zoomIn,
    doGlobeZoomOut: zoomOut,
  } = useConnect(
    "selectGlobeViewer",
    "doGlobeFlyTo",
    "doGlobeZoomIn",
    "doGlobeZoomOut"
  );

  return {
    globe,
    flyTo,
    zoomIn,
    zoomOut,
  };
};

export default useGroundworkGeo;
export { useGroundworkGeo };
