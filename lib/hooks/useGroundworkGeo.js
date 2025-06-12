
import { useConnect } from "redux-bundler-hook";

const useGroundworkGeo = () => {
    // const {
    //     // layers,
    //     doLayersInitialize,
    //     doMapsInitialize,

    // } = useConnect(
    //     // "selectLayers",
    //     "doLayersInitialize",
    //     "doMapsInitialize",

    // );
    const doMapsInitialize = store.doMapsInitialize
    const doLayersInitialize = store.doLayersInitialize

    return {
        doMapsInitialize,
        doLayersInitialize
    };
};

export default useGroundworkGeo;
export { useGroundworkGeo };
