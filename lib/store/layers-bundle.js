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
                const nextIds = new Set(layers.map((layer) => layer.id).filter(Boolean));

                previousLayers.forEach((previousLayer) => {
                    if (!previousLayer?.id || !nextIds.has(previousLayer.id)) return;
                    if (previousLayer.layer && map) {
                        map.removeLayer(previousLayer.layer);
                    }
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
