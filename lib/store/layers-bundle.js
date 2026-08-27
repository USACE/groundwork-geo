const layersBundle = {
    name: "layers",

    getReducer: () => {
        const initialData = {
            layers: [],
            layersByMapId: {},
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
    selectLayersByMapId: (state) => state.layers.layersByMapId,

    doLayersInitialize:
        (layers, mapId) =>
            ({ dispatch, store }) => {
                const map = store.selectMaps()[mapId];
                const layersByMapId = store.selectLayersByMapId?.() || {};
                const previousLayers = layersByMapId[mapId] || [];

                previousLayers.forEach((previousLayer) => {
                    previousLayer?._remove?.();
                });

                function addLayer(layer) {
                    // adding map to our layer property
                    layer.map = map;
                    // callig layer add function to add itself to the map
                    layer._add();
                    // @TODO can we get layer features here and dispatch it to a selector?

                }
                layers.forEach((layer) => addLayer(layer));

                dispatch({
                    type: "LAYERS_INITIALIZED",
                    payload: {
                        layers,
                        layersByMapId: {
                            ...layersByMapId,
                            [mapId]: layers,
                        },
                    },
                });
            }
};

export default layersBundle;
