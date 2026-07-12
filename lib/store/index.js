import { composeBundles, createCacheBundle } from "redux-bundler"
import mapsBundle from "./maps-bundle";
import layersBundle from "./layers-bundle";
import cache from "./cache"
import basemapsBundle from "./basemaps-bundle";
// import createGeojsonLayerBundle from "./create-geojson-layer-bundle";
// import divisionsLayerBundle from "./divisions-layer-bundle";

const groundworkGeoBundles = [
    createCacheBundle({ cacheFn: cache.set }),
    mapsBundle,
    layersBundle,
    basemapsBundle
];

const groundworkGeoStore = composeBundles(...groundworkGeoBundles)

export default groundworkGeoStore;
export { groundworkGeoBundles };
