import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";

import Layer from "./layer";
import {
    createStatusMarkerStyle,
    getThresholdStatus,
    statusColor,
} from "../styles/status-marker-style";

function defaultCoordinateAccessor(item) {
    const lon = item.longitude ?? item.lon ?? item.x;
    const lat = item.latitude ?? item.lat ?? item.y;

    return [Number(lon), Number(lat)];
}

function defaultShapeAccessor(item) {
    const type = String(item.type ?? item.locationType ?? item.kind ?? "").toLowerCase();

    if (type.includes("reservoir") || type.includes("project")) return "triangle";
    if (type.includes("lock")) return "square";
    return "diamond";
}

function defaultLabelAccessor(item) {
    return item.mapLabel ?? item.publicName ?? item.name ?? item.id;
}

function normalizeFeatures(data, coordinateAccessor) {
    const entries = data?.type === "FeatureCollection" ? data.features : data;

    return (entries || [])
        .map((entry) => {
            const properties = entry.type === "Feature" ? entry.properties || {} : entry;
            const coordinates =
                entry.type === "Feature"
                    ? entry.geometry?.coordinates
                    : coordinateAccessor(properties);

            if (!coordinates || coordinates.length < 2) return null;

            const lon = Number(coordinates[0]);
            const lat = Number(coordinates[1]);

            if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;

            const feature = new Feature({
                geometry: new Point(fromLonLat([lon, lat])),
                ...properties,
            });

            return feature;
        })
        .filter(Boolean);
}

class StatusMarkerLayer extends Layer {
    constructor({
        id,
        name,
        source = [],
        map = null,
        visible = true,
        fit = false,
        thresholds,
        colors,
        radius = 9,
        coordinateAccessor = defaultCoordinateAccessor,
        shapeAccessor = defaultShapeAccessor,
        labelAccessor = defaultLabelAccessor,
        statusAccessor,
        style,
        onClick,
    }) {
        super({ id, name, source, map, visible });
        this.colors = colors;
        this.coordinateAccessor = coordinateAccessor;
        this.fit = fit;
        this.labelAccessor = labelAccessor;
        this.onClick = onClick;
        this.radius = radius;
        this.shapeAccessor = shapeAccessor;
        this.statusAccessor = statusAccessor;
        this.style = style;
        this.thresholds = thresholds;
        this._add();
    }

    _getStyle(feature) {
        if (typeof this.style === "function") return this.style(feature);
        if (this.style) return this.style;

        const properties = feature.getProperties();
        let status =
            typeof this.statusAccessor === "function"
                ? this.statusAccessor(properties)
                : undefined;

        if (status === null || status === undefined) {
            status = getThresholdStatus(properties.statusValue ?? properties.value, this.thresholds);
        }

        return createStatusMarkerStyle({
            color: statusColor(status, this.colors),
            label: this.labelAccessor ? this.labelAccessor(properties) : "",
            radius: this.radius,
            shape: this.shapeAccessor ? this.shapeAccessor(properties) : "circle",
        });
    }

    _add() {
        if (!this.map || this.added) return;

        const source = new VectorSource({
            features: normalizeFeatures(this.source, this.coordinateAccessor),
        });

        this.layer = new VectorLayer({
            source,
            style: (feature) => this._getStyle(feature),
            zIndex: 1000,
            visible: this.visible,
        });
        this.layer.show = this.visible;

        if (typeof this.onClick === "function") {
            this._listen("click", (event) => {
                this.layer.getFeatures(event.pixel).then((features) => {
                    const feature = features[0];
                    if (feature) this.onClick(feature, event.coordinate);
                });
            });
        }

        this.map.addLayer(this.layer);

        if (this.fit && source.getFeatures().length) {
            this.map.getView().fit(source.getExtent(), {
                padding: [32, 32, 32, 32],
                maxZoom: 11,
                duration: 250,
            });
        }

        this._setAdded();
    }
}

export default StatusMarkerLayer;
export { StatusMarkerLayer };
