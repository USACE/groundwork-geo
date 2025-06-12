import { useEffect, useRef } from 'react';
import { useConnect } from 'redux-bundler-hook';
// import BasemapToggle from './map-controls/basemap-toggle';
import 'ol/ol.css';
// import LayerToggle from './map-controls/layer-switcher';


function Map({ mapId, layers, viewConfig }) {
    const mapEl = useRef();
    const {
        doMapsInitialize,
        doLayersInitialize,
        doBasemapsInitialize
    } = useConnect(
        'doMapsInitialize',
        'doLayersInitialize',
        'doBasemapsInitialize',
        // 'selectMaps'
    );

    useEffect(() => {
        //@TODO should we check if the map id already exists?
        doMapsInitialize({
            id: mapId,
            target: mapEl.current,
            viewConfig: viewConfig
        });
        doBasemapsInitialize(mapId)
    }, [mapEl.current]);

    useEffect(() => {
        if (layers) {
            doLayersInitialize(layers, mapId)
        }
    }, [layers])

    return (
        <div style={{ position: 'absolute', bottom: "0", left: "0", right: "0", top: "0" }} ref={mapEl}>
            {/* {basemapSwitcher ? <BasemapToggle mapId={mapId} /> : null}
            {layerSwitcher ? <LayerToggle mapId={mapId} /> : null} */}
        </div>
    );
}

export default Map;
export { Map }
