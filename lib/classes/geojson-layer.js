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
            tooltipElement.style.position = "relative";
            tooltipElement.style.whiteSpace = "pre-line";
            tooltipElement.style.zIndex = "10000";
            tooltipElement.style.display = "none";
            tooltipElement.dataset.groundworkGeoTooltip = "true";

            const tooltipOverlay = new Overlay({
                element: tooltipElement,
                offset: [0, -12],
                positioning: "bottom-center",
            });
            tooltipOverlay.set("id", tooltipId);
            this.map.addOverlay(tooltipOverlay);
            const raiseTooltipOverlay = () => {
                const container = tooltipElement.parentElement;
                if (container) {
                    container.style.pointerEvents = "none";
                    container.style.zIndex = "10000";
                    const overlayRoot = container.parentElement;
                    if (overlayRoot) {
                        overlayRoot.style.zIndex = "10000";
                    }
                }
            };
            const hidePeerTooltips = () => {
                this.map.getOverlays().getArray()
                    .filter((overlay) => overlay.get("id")?.startsWith("tooltip-"))
                    .forEach((overlay) => {
                        if (overlay !== tooltipOverlay) {
                            const element = overlay.getElement?.();
                            if (element) element.style.display = "none";
                        }
                    });
            };
            raiseTooltipOverlay();

            this.map.on("pointermove", (e) => {
                this.layer.getFeatures(e.pixel).then((features) => {
                    const feature = features.length ? features[0] : undefined;
                    const text = feature ? this.tooltip(feature, e.coordinate) : "";
                    if (!text) {
                        tooltipElement.style.display = "none";
                        return;
                    }
                    const mapElement = this.map.getTargetElement?.();
                    const mapWidth = mapElement?.clientWidth || 0;
                    const mapHeight = mapElement?.clientHeight || 0;
                    const nearLeft = e.pixel[0] < 160;
                    const nearRight = mapWidth && e.pixel[0] > mapWidth - 160;
                    const nearTop = e.pixel[1] < 80;
                    const nearBottom = mapHeight && e.pixel[1] > mapHeight - 80;

                    if (mapWidth) {
                        tooltipElement.style.maxWidth = `${Math.max(160, Math.min(288, mapWidth - 16))}px`;
                    }

                    if (nearTop && nearLeft) {
                        tooltipOverlay.setPositioning("top-left");
                        tooltipOverlay.setOffset([8, 12]);
                    } else if (nearTop && nearRight) {
                        tooltipOverlay.setPositioning("top-right");
                        tooltipOverlay.setOffset([-8, 12]);
                    } else if (nearBottom && nearLeft) {
                        tooltipOverlay.setPositioning("bottom-left");
                        tooltipOverlay.setOffset([8, -12]);
                    } else if (nearBottom && nearRight) {
                        tooltipOverlay.setPositioning("bottom-right");
                        tooltipOverlay.setOffset([-8, -12]);
                    } else if (nearTop) {
                        tooltipOverlay.setPositioning("top-center");
                        tooltipOverlay.setOffset([0, 12]);
                    } else if (nearLeft) {
                        tooltipOverlay.setPositioning("bottom-left");
                        tooltipOverlay.setOffset([8, -12]);
                    } else if (nearRight) {
                        tooltipOverlay.setPositioning("bottom-right");
                        tooltipOverlay.setOffset([-8, -12]);
                    } else {
                        tooltipOverlay.setPositioning("bottom-center");
                        tooltipOverlay.setOffset([0, -12]);
                    }

                    hidePeerTooltips();
                    tooltipElement.textContent = text;
                    tooltipElement.style.display = "block";
                    tooltipOverlay.setPosition(e.coordinate);
                    raiseTooltipOverlay();
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
