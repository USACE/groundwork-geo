import { useConnect } from "redux-bundler-hook";

const useGroundworkGeo = () => {
    const {
        doMapsInitialize,
        doLayersInitialize,
    } = useConnect(
        "doLayersInitialize",
        "doMapsInitialize",
    );

    return {
        doMapsInitialize,
        doLayersInitialize,
    };
};

export default useGroundworkGeo;
export { useGroundworkGeo };
