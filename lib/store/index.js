import { composeBundles, createCacheBundle } from "redux-bundler"
import mapsBundle from "./maps-bundle";
import layersBundle from "./layers-bundle";
import cache from "./cache"
import basemapsBundle from "./basemaps-bundle";
// import createGeojsonLayerBundle from "./create-geojson-layer-bundle";
// import divisionsLayerBundle from "./divisions-layer-bundle";

export default composeBundles(
    createCacheBundle({ cacheFn: cache.set }),
    mapsBundle,
    layersBundle,
    basemapsBundle
)