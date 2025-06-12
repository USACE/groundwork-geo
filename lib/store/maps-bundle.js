import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { fromLonLat } from 'ol/proj';

const actions = {
    INITIALIZED: 'MAPS_INITIALIZED',
    TARGET_SET: 'MAPS_TARGET_SET',
    BASEMAP_CHANGED: 'MAPS_BASEMAP_CHANGED',
};

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

const mapsBundle = {
    name: 'maps',

    getReducer: () => {
        const initialData = {};

        return (state = initialData, { type, payload }) => {
            switch (type) {
                case actions.INITIALIZED:
                    return { ...state, ...payload };
                default:
                    return state;
            }
        };
    },

    selectMaps: (state) => {
        return state.maps;
    },

    selectMapsBasemaps: () => {
        return basemaps;
    },

    doMapsInitialize:
        ({ id, target, basemapIdx = 0, viewConfig }) =>
            ({ dispatch, store }) => {
                const existingMaps = store.selectMaps();
                if (existingMaps && existingMaps[id]) {
                    return store.doMapsSetTarget({ id, target });
                }
                let config;
                if (viewConfig) {
                    config = {
                        center: fromLonLat(viewConfig.center),
                        zoom: viewConfig.zoom
                    }
                } else {
                    config = {
                        ...{
                            center: fromLonLat([-96, 39]),
                            zoom: 3,
                        },
                    };
                }


                const map = new Map({
                    view: new View(config),
                    target: target,
                    controls: []
                });

                // extend the map object to handle basemap switching,
                // super simplistic at this point
                // map.set(
                //     'basemaps',
                //     basemaps.map((bm, i) => {
                //         const lyr = new TileLayer({
                //             source: new XYZ({
                //                 url: bm.url,
                //                 tilePixelRatio: 1,
                //             }),
                //         });
                //         lyr.set('id', bm.id);
                //         lyr.set('idx', i);
                //         lyr.set('lt', bm.labelTheme);
                //         return lyr;
                //     }),
                //     true
                // );
                // map.set('basemapIdx', basemapIdx, true);
                // // @ts-ignore
                // map.setBasemap = function (idx) {
                //     const layers = this.getLayers();
                //     const basemaps = this.get('basemaps');
                //     layers.insertAt(0, basemaps[idx]);
                //     layers.removeAt(1);
                //     this.set('basemapIdx', idx);
                // };
                // // @ts-ignore
                // // only really works when there are just 2 basemaps to toggle between
                // map.toggleBasemap = function () {
                //     const currentIdx = this.get('basemapIdx');
                //     // @ts-ignore
                //     this.setBasemap(1 - currentIdx);
                // };

                // // @ts-ignore
                // map.setBasemap(basemapIdx);

                dispatch({
                    type: actions.INITIALIZED,
                    payload: {
                        [id]: map,
                    },
                });
            },

    doMapsSetTarget:
        ({ id, target }) =>
            ({ dispatch, store }) => {
                const maps = store.selectMaps();
                const map = maps[id];

                if (!map) {
                    console.error('unable to find a map with the id of', id);
                    return;
                }

                map.setTarget(target);
                dispatch({
                    type: actions.TARGET_SET,
                    payload: {
                        mapId: id,
                    },
                });
            },
};

export default mapsBundle;
export { actions };
