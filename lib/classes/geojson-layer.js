import Layer from "./layer"
import EsriJSON from 'ol/format/EsriJSON.js';
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Overlay from "ol/Overlay.js";
import { createXYZ } from 'ol/tilegrid.js';
import { tile as tileStrategy } from 'ol/loadingstrategy.js';


import defaultStyles from "../defaultStyles";
import store from "../store/app-store.js";

class GeoJSONLayer extends Layer {
    constructor({
        id,
        name,
        source,
        style,
        map = null,
        type = 'geojson',
        visible = true,
        fit = false,
        tooltip,
        onClick
    }) {
        super({ id, name, source, map, visible });
        this.fit = fit
        this.style = style
        this.type = type
        this.tooltip = tooltip
        this.onClick = onClick
        this._add();
    }

    _add() {
        if (!this.map) return;
        if (!this.style) {
            this.style = defaultStyles
        }
        // establishing OL vector layer format
        if (this.type === 'geojson') {
            // if url, load remote data
            if (typeof (this.source) === 'string') {
                this.layer = new VectorLayer({
                    source: new VectorSource({
                        url: this.source,
                        format: new GeoJSON()
                    }),
                    style: this.visible ? this.style : null
                })
                this.layer.show = this.visible;

            } else {
                // load local file
                this.layer = new VectorLayer({
                    source: new VectorSource({
                        features: new GeoJSON().readFeatures(this.source, {
                            featureProjection: 'EPSG:3857'
                        })

                    }),
                    style: this.visible ? this.style : null
                })
                this.layer.show = this.visible;
            }
        } else if (this.type === 'esrijson') {
            // load esriJSON
            // @TODO does every esri link look the same? 
            let esriSource = this.source
            this.layer = new VectorLayer({
                source: new VectorSource({
                    url: function (extent, resolution, projection) {
                        // ArcGIS Server only wants the numeric portion of the projection ID.
                        const srid = projection
                            .getCode()
                            .split(/:(?=\d+$)/)
                            .pop();
                        const url = esriSource +
                            '/query/?f=json&' +
                            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
                            encodeURIComponent(
                                '{"xmin":' +
                                extent[0] +
                                ',"ymin":' +
                                extent[1] +
                                ',"xmax":' +
                                extent[2] +
                                ',"ymax":' +
                                extent[3] +
                                ',"spatialReference":{"wkid":' +
                                srid +
                                '}}',
                            ) +
                            '&geometryType=esriGeometryEnvelope&inSR=' +
                            srid +
                            '&outFields=*' +
                            '&outSR=' +
                            srid;

                        return url;
                    },
                    strategy: tileStrategy(
                        createXYZ({
                            tileSize: 512,
                        }),
                    ),
                    format: new EsriJSON(),
                }),
                style: this.visible ? this.style : null
            })
            this.layer.show = this.visible;
        }

        if (typeof this.onClick === 'function') {
            this.map.on('click', (e) => {
                this.layer.getFeatures(e.pixel).then((features) => {
                    const feature = features.length ? features[0] : undefined;
                    if (!feature) return;
                    const result = this.onClick(feature, e.coordinate);
                    if (typeof result === "function") result({ store });
                });
            });
        }

        if (typeof this.tooltip === "function") {
            const tooltipId = `tooltip-${this.id}`;
            this.map.getOverlays().getArray()
                .filter((overlay) => overlay.get("id") === tooltipId)
                .forEach((overlay) => this.map.removeOverlay(overlay));

            const tooltipElement = document.createElement("div");
            tooltipElement.style.background = "rgba(17, 24, 39, 0.92)";
            tooltipElement.style.borderRadius = "4px";
            tooltipElement.style.color = "#fff";
            tooltipElement.style.fontSize = "12px";
            tooltipElement.style.maxWidth = "18rem";
            tooltipElement.style.padding = "6px 8px";
            tooltipElement.style.pointerEvents = "none";
            tooltipElement.style.whiteSpace = "pre-line";
            tooltipElement.style.display = "none";

            const tooltipOverlay = new Overlay({
                element: tooltipElement,
                offset: [0, -12],
                positioning: "bottom-center",
            });
            tooltipOverlay.set("id", tooltipId);
            this.map.addOverlay(tooltipOverlay);

            this.map.on("pointermove", (e) => {
                this.layer.getFeatures(e.pixel).then((features) => {
                    const feature = features.length ? features[0] : undefined;
                    const text = feature ? this.tooltip(feature, e.coordinate) : "";
                    if (!text) {
                        tooltipElement.style.display = "none";
                        return;
                    }
                    tooltipElement.textContent = text;
                    tooltipElement.style.display = "block";
                    tooltipOverlay.setPosition(e.coordinate);
                });
            });
        }


        // calling OL map add layer function
        this.map.addLayer(this.layer)

        if (this.fit) {
            const fitToSource = () => {
                const source = this.layer?.getSource?.();
                if (!source || !source.getFeatures().length) return;
                this.map.getView().fit(source.getExtent(), {
                    padding: [32, 32, 32, 32],
                    maxZoom: 9,
                    duration: 250,
                });
            };
            const source = this.layer.getSource();
            if (source.getState?.() === "ready" || source.getFeatures().length) {
                fitToSource();
            } else {
                source.once("featuresloadend", fitToSource);
                source.once("change", fitToSource);
            }
        }

        this._setAdded = true
    }
}

export default GeoJSONLayer;
export { GeoJSONLayer };
