import { Circle, Fill, RegularShape, Stroke, Style, Text } from "ol/style";

const DEFAULT_STATUS_COLORS = [
    "#008000",
    "#00c853",
    "#5e9696",
    "#b07c00",
    "#fefe00",
    "#e78b8b",
    "#a60000",
    "#f40000",
];

function getThresholdStatus(value, thresholds = [10, 25, 50, 75, 100, 125, 150]) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return "missing";
    }

    const numericValue = Number(value);
    const index = thresholds.findIndex((threshold) => numericValue < threshold);

    return index === -1 ? thresholds.length : index;
}

function getMarkerShape(shape, radius, fill, stroke) {
    if (shape === "triangle") {
        return new RegularShape({
            points: 3,
            radius,
            rotation: 0,
            fill,
            stroke,
        });
    }

    if (shape === "square") {
        return new RegularShape({
            points: 4,
            radius,
            angle: Math.PI / 4,
            fill,
            stroke,
        });
    }

    if (shape === "diamond") {
        return new RegularShape({
            points: 4,
            radius,
            fill,
            stroke,
        });
    }

    return new Circle({
        radius,
        fill,
        stroke,
    });
}

function createStatusMarkerStyle({
    color,
    label,
    radius = 9,
    shape = "circle",
    textColor = "#111827",
    strokeColor = "#1f2937",
    strokeWidth = 1.5,
} = {}) {
    const resolvedColor = color || "#d1d5db";
    const fill = new Fill({ color: resolvedColor });
    const stroke = new Stroke({ color: strokeColor, width: strokeWidth });

    return new Style({
        image: getMarkerShape(shape, radius, fill, stroke),
        text: label
            ? new Text({
                  text: String(label),
                  offsetY: -20,
                  font: "600 12px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
                  fill: new Fill({ color: textColor }),
                  stroke: new Stroke({ color: "rgba(255,255,255,0.85)", width: 3 }),
              })
            : undefined,
    });
}

function statusColor(status, colors = DEFAULT_STATUS_COLORS) {
    if (status === "missing") return "#d1d5db";
    if (status === "transparent") return "rgba(255,255,255,0)";

    return colors[status] || colors[colors.length - 1] || "#d1d5db";
}

export {
    DEFAULT_STATUS_COLORS,
    createStatusMarkerStyle,
    getThresholdStatus,
    statusColor,
};
