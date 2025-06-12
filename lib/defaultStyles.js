import { Circle, Style, Fill, Stroke } from "ol/style";

const fill = new Fill({
    color: 'rgba(255,255,255,0.4)',
});
const stroke = new Stroke({
    color: '#3399CC',
    width: 1.25,
});
const defaultStyles =
    new Style({
        image: new Circle({
            fill: fill,
            stroke: stroke,
            radius: 5,
        }),
        fill: fill,
        stroke: stroke,
    });

export default defaultStyles;