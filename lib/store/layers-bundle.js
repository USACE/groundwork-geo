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
        (layers, mapId) =>
            ({ dispatch, store }) => {
                const map = store.selectMaps()[mapId];
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
                    },
                });
            }
};

export default layersBundle;