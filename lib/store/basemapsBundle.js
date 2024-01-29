import { UrlTemplateImageryProvider } from "cesium";

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const basemaps = [
  {
    id: "OpenStreetMap",
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  {
    id: "MapBoxStreets",
    name: "MapBox Streets",
    url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${accessToken}`,
  },
  {
    id: "MapBoxAerial",
    name: "MapBox Aerial",
    url: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}?access_token=${accessToken}`,
  },
  {
    id: "MapBoxOutdoor",
    name: "MapBox Outdoor",
    url: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=${accessToken}`,
  },
  {
    id: "EsriWorldStreetMap",
    name: "ESRI Streetmap",
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: "EsriWorldImagery",
    name: "ESRI World Imagery",
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: "EsriUSATopoMaps",
    name: "ESRI Topo Maps",
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: "EsriWorldShadedRelief",
    name: "ESRI World Hillshade",
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: "EsriWorldOcean",
    name: "ESRI World Ocean",
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: "USGSImageryTopo",
    name: "USGS Imagery/Topo",
    url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: "CartoDBDarkMatter",
    name: "CartoDB Dark Matter",
    url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
  },
  {
    id: "CartoDBPositron",
    name: "CartoDB Positron",
    url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
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
        case "GLOBE_INITIALIZED":
          return { ...state, _shouldInitialize: true };
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
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "BASEMAPS_INITIALIZED",
        payload: { _shouldInitialize: false },
      });
      store.doBasemapsSetActiveBasemap(store.selectBasemapsDefault());
    },

  doBasemapsSetActiveBasemap:
    (basemap) =>
    ({ dispatch, store }) => {
      const viewer = store.selectGlobeViewer();
      viewer.imageryLayers.addImageryProvider(
        new UrlTemplateImageryProvider({
          url: basemap.url,
        }),
        0
      );
      viewer.imageryLayers.remove(viewer.imageryLayers.get(1));
      dispatch({ type: "BASEMAPS_CHANGED", payload: { active: basemap } });
    },

  doBasemapsSwitch:
    (basemap) =>
    ({ store }) => {
      store.doBasemapsSetActiveBasemap(basemap);
    },

  reactBasemapsShouldInitialize: (state) => {
    if (state.basemaps._shouldInitialize)
      return { actionCreator: "doBasemapsInitialize" };
  },
};

export default basemapsBundle;
