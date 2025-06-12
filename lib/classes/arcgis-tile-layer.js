import Layer from "./layer";
import Tile from "ol/layer/Tile";
import { TileArcGISRest } from "ol/source";

class ArcGISTileLayer extends Layer {
    constructor({
        id,
        name,
        source,
        style,
        map = null,
        visible = true
    }) {
        super({ id, name, source, map, visible });
        this.style = style
        this._add();
    }

    _add() {
        if (!this.map) return;
        this.layer = new Tile({
            source: new TileArcGISRest({
                url: this.source
            }),
        });
        // calling OL map add layer function
        this.map.addLayer(this.layer)

        this._setAdded = true
    }
}

export default ArcGISTileLayer;
export { ArcGISTileLayer }