import Layer from "./layer";
import Tile from "ol/layer/WebGLTile";
import ImageTile from 'ol/source/ImageTile.js';

class TileLayer extends Layer {
    constructor({
        id,
        name,
        source,
        style,
        map = null,
        visible = true,
        opacity = 1,
        zIndex
    }) {
        super({ id, name, source, map, visible });
        this.style = style
        this.opacity = opacity
        this.zIndex = zIndex
        this._add();
    }

    _add() {
        if (!this.map) return;
        this.layer = new Tile({
            source: typeof this.source === "string" ? new ImageTile({
                url: this.source
            }) : this.source,
            opacity: this.opacity,
            visible: this.visible,
            zIndex: this.zIndex,
        });
        // calling OL map add layer function
        this.map.addLayer(this.layer)

        this._setAdded = true
    }
}

export default TileLayer;
export { TileLayer }
