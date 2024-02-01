import LayerGroup from "../classes/LayerGroup";

const layersBundle = {
  name: "layers",

  getReducer: () => {
    const initialData = {
      layers: [],
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "LAYERS_INITIALIZED":
          return {
            ...state,
            ...payload,
          };
        default:
          return state;
      }
    };
  },

  selectLayers: (state) => state.layers.layers,

  doLayersInitialize:
    (layers) =>
    ({ dispatch, store }) => {
      const viewer = store.selectGlobeViewer();

      function addLayer(layer) {
        if (layer instanceof LayerGroup) {
          layer.children.forEach((child) => addLayer(child));
        } else {
          layer.viewer = viewer;
          layer._add();
        }
      }

      layers.forEach((layer) => addLayer(layer));

      dispatch({
        type: "LAYERS_INITIALIZED",
        payload: {
          layers,
        },
      });
    },
};

export default layersBundle;
