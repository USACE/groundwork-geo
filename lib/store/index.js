import { composeBundles, createCacheBundle } from "redux-bundler";
import cache from "./cache";
import globeBundle from "./globeBundle";
import layersBundle from "./layersBundle";
import panelSizeBundle from "./panelSizeBundle";
import basemapsBundle from "./basemapsBundle";

export default composeBundles(
  createCacheBundle({ cacheFn: cache.set }),
  globeBundle,
  layersBundle,
  panelSizeBundle,
  basemapsBundle
);
