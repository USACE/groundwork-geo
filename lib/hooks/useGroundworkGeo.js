import { useConnect } from "redux-bundler-hook";

const useGroundworkGeo = () => {
  const {
    globeViewer: viewer,
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
    viewer,
    flyTo,
    zoomIn,
    zoomOut,
  };
};

export default useGroundworkGeo;
export { useGroundworkGeo };
