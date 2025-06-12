import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
const basemaps = [
    {
        id: 'OpenStreetMap',
        name: 'OpenStreetMap',
        url: 'https://{a-b}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        labelTheme: 'light',
    },
    {
        id: 'EsriWorldImagery',
        name: 'ESRI World Imagery',
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        labelTheme: 'dark',
    },
    {
        id: 'EsriUSATopoMaps',
        name: 'ESRI Topo Maps',
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}',
        labelTheme: 'light',
    },
    {
        id: 'Positron',
        name: 'Positron',
        url: 'https://cartodb-basemaps-{a-c}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        labelTheme: 'light',
    },
    {
        id: 'DarkMatter',
        name: 'Dark Matter',
        url: 'https://cartodb-basemaps-{a-c}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
        labelTheme: 'dark',
    },
];

const basemapsBundle = {
    name: "basemaps",

    getReducer: () => {
        const initialData = {
            default: basemaps[0],
            active: null,
            basemaps: basemaps,
            _shouldInitialize: false,
        };

        return (state = initialData, { type, payload }) => {
            switch (type) {
                case "BASEMAPS_CHANGED":
                case "BASEMAPS_INITIALIZED":
                    return { ...state, ...payload };
                default:
                    return state;
            }
        };
    },

    selectBasemapsDefault: (state) => state.basemaps.default,
    selectBasemapsActive: (state) => state.basemaps.active,
    selectBasemapsList: (state) => state.basemaps.basemaps,

    doBasemapsInitialize:
        (mapId) =>
            ({ dispatch, store }) => {
                dispatch({
                    type: "BASEMAPS_INITIALIZED",
                    payload: { _shouldInitialize: false },
                });
                store.doBasemapsSetActiveBasemap(store.selectBasemapsDefault(), mapId);
            },

    doBasemapsSetActiveBasemap:
        (basemap, mapId) =>
            ({ dispatch, store }) => {
                const map = store.selectMaps()[mapId]
                const lyr = new TileLayer({
                    source: new XYZ({
                        url: basemap.url,
                        tilePixelRatio: 1,
                    }),
                    id: basemap.id
                });
                let layers = map?.getLayers()
                if (layers) {
                    layers.insertAt(0, lyr)
                    layers.removeAt(1)
                }

                dispatch({ type: "BASEMAPS_CHANGED", payload: { active: basemap } });
            },

    doBasemapsSwitch:
        (basemap, mapId) =>
            ({ store }) => {
                console.log(mapId)
                store.doBasemapsSetActiveBasemap(basemap, mapId);
            },

    reactBasemapsShouldInitialize: (state) => {
        if (state.basemaps._shouldInitialize)
            return { actionCreator: "doBasemapsInitialize" };
    },
};

export default basemapsBundle;